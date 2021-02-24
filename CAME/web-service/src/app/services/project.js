const Project = require('../models/project');
const Characteristic = require('../models/characteristic');
const Config = require('../models/config')

const TenantSettingsService = require('./tenantSettings')
const TenantSettingsConstants = require('../constants/tenantSettings')

const slugify = require("slugify");
const fetch = require('node-fetch');

// CRUD

exports.add = async function(params, user) {

    if (!params.length) {
        params = [ params ]
    }

    // ini iterate projects
    var initAll = params.map(doc => {
        doc.characteristics.forEach((e, idx) => {
            if (!e.weight) doc.characteristics[idx].weight = 1;
        });

        // ini iteraate characteristics per project
        var init = doc.characteristics.map(e =>
            e.ref
                ? Promise.resolve(e)
                : new Promise((resolve, reject) => {
                    let c = Characteristic.findOne({ id: e.id })
                            .then(res => {
                                if (res) {
                                    let characteristic = {
                                        ...e,
                                        ref: res.characteristicValues[0].ref
                                    };
                                    return characteristic;
                                }
                            })
                            .catch(err => {
                                console.log("Find ref project", err);
                                // throw "Error when finding ref project"
                                reject(err)
                            });
                    resolve(c);
                })
        );

        return new Promise((resolve, reject) => {
            let projectId = slugify(doc.name, {
                replacement: "-",
                remove: /[*+~.()'"!:@]/g,
                lower: true
            });

            let p = Promise.all(init).then(characteristics => {
                let creator = doc.user || user.username;
                let tenantId= doc.tenantId || user.tenantId
                let d = {
                    ...doc,
                    project: projectId,
                    user: creator,
                    tenantId: tenantId,
                    id: creator + "/" + projectId,
                    characteristics: characteristics,
                    method_chunks: []
                };
                return d;
            });
            resolve(p);
        });
    });

    return Promise.all(initAll)
    .then(docs => {
        return Project.insertMany(docs)
        .then(result => { return result })
        .catch(err => {
            console.log("Create bulk project", err);
            throw new Error( err.errmsg || "Some error occurred while saving")
        //     // res.status(400).send({
        //     //     message: err.message || "Some error occurred while saving."
        //     // });
        });
    })
    // .catch(err => {
    //     console.log(err);
    //     throw new Error(err.message || "Some error occurred while saving")
    //     // res.status(400).send({
    //     //     message: err.message || "Some error occurred while saving."
    //     // });
    // });

	// const project = new Project(params);

    // save project
    // await project.save();
}

exports.getMCFromMBMS = async function(mcs, project_id) {
    // mcs: [{name_id, source (name, url)}]

    const project = await Project.findOne({
        id: project_id
    })

    if (!project) throw 'Project not found';

    var initAll = mcs.map(doc => {
        return new Promise((resolve, reject) => {
            fetch(doc.source.url)
                .then(response => {
                    if (response.ok) {
                        response.text()
                            .then(text => {
                                const res = text && JSON.parse(text);
                                let m = res.data
                                m.id = res.data.nameId
                                m.source = doc.source

                                resolve(m)
                            })
                    } else {
                        throw 'Cannot fetch'
                    }
                })
                .catch(err => {
                    reject()
                })
        });
    });

    return Promise.all(initAll.map(p => p.catch(e => e)))
    .then(docs => {
        project.method_chunks = docs.filter(d => d != null)
        project.save()
        .then(result => { return result })
        .catch(err => {
            console.log("Get All MC For Project", err);
            throw new Error( err.errmsg || "Get All MC For Project")
        });
    })
    .catch(err => {
        console.log(err)
    })

}

exports.getMCRecommendations = async function(pid) {
    const project = await Project.findOne({
        id: pid
    })

    if (!project) throw 'Project not found';

    let body = {}
    body['project_characteristics'] = project.characteristics

    var promise1 = new Promise((resolve, reject) => {
        fetch(`${process.env.URL_MCRS}/find`,{
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => {
            resolve(json)
        })
    })

    return promise1.then(result => {
        return result
    })

    
}

exports.saveMethod = async function(pid, created_method, user) {
    const project = await Project.findOne({
        id: pid
    })

    if (!project) throw 'Project not found';

    let new_method = created_method

    let newNameId = new_method.name;
    newNameId = newNameId.replace(/\s/g,'');
    
    new_method.nameId = newNameId
    new_method.creator = user.username

    project.method = new_method
    await project.save()

}

exports.getAll = async function() {
    return await Project.find();
}

exports.getAllPerTenant = async function(tenantId, user) {
    if (tenantId === 'admin') {
        return await Project.find();
    } else {
        const ProjectPerTenant =  await Project.byTenant(tenantId)
        let current_config = await Config.findOne({
            tenantId: tenantId.toLowerCase(),
        })

        let currentTenantSettings = await TenantSettingsService.getByType(current_config.type)

        if (currentTenantSettings.capabilities.indexOf(TenantSettingsConstants.SEE_ALL_PROJECTS) !== -1) {
            return await ProjectPerTenant.find();
        } else {
            return await ProjectPerTenant.find({user: user.username});
        }
        
    }
    
}

exports.getById = async function(id) {
	return await Project.findById(id);
}

exports.getByPid = async function(user, project) {
    return await Project.findOne({
        user: user.toLowerCase(),
        project: project.toLowerCase()
    })
}

exports.update = async function(user_id, project_id, params) {

	const project = this.getByPid(user_id, project_id);

    // validate
    if (!project) throw 'Project not found';

    project.then(p => {

        Object.assign(p, params);
        p.save();
    })
    
}

exports._delete = async function(id) {
    await Project.findByIdAndRemove(id);
}

var composeCompetencies = function(chunk) {
    var firstChunk = chunk;

    var firstChunkCompetencies = firstChunk.competencies;

    // BY RINDA - pre process list of levelsnya biar bukan array of object tapi array of string
    firstChunkCompetencies.forEach((comp, idx) => {
        var firstLevels = []
        comp.levels.forEach(el => {
            firstLevels.push(el.name)
        })

        firstChunkCompetencies[idx].levels = firstLevels
    })

    return firstChunkCompetencies
}

exports.cobacoba = async function() {
    
    let arr = [1]

    let x = arr[0]


    arr.splice(0,2)
    

    

    return await { x: x, arr1: arr[0],  arr: arr}
}