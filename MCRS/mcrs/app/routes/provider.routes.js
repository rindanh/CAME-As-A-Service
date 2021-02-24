const express = require("express");
const router = express.Router();
const providers = require("../controllers/provider.controller.js");

/**
 * @swagger
 * /providers:
 *   get:
 *     description: Returns a list of all the providers
 *     tags:
 *       - Providers
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *       - in: query
 *         name: industry
 *         schema:
 *           type: string
 *       - in: query
 *         name: relatedProviders
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         description: sort by key e.g. name, industry
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         description: sort order e.g. asc, desc
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all providers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: array of providers
 *               items:
 *                 $ref: '#/components/schemas/Provider'
 *             example:
 *               - _id: "5d22f6449f200f0e74fbbfc0"
 *                 id: "company-a-ltd"
 *                 name: Company A (Ltd.)
 *                 email: "company@a.com"
 *                 createdAt: "2019-07-07T09:51:41.221Z"
 *                 updatedAt: "2019-07-08T08:24:41.221Z"
 *               - _id: "5d224d482aba2723501a0cc8"
 *                 id: "company-b"
 *                 name: Company B
 *                 email: "companyb@example.com"
 *                 createdAt: "2019-07-08T08:24:41.221Z"
 *                 updatedAt: "2019-07-08T08:24:41.221Z"
 *
 */
router.get("/", providers.findAll);

/**
 * @swagger
 * /providers:
 *   post:
 *     description: Create a provider and add to the list. For bulk insert, see `bulk` in examples.
 *     tags:
 *       - Providers
 *     requestBody:
 *       description: Provider account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProviderInput'
 *           examples:
 *             default:
 *               $ref: '#/components/examples/ProviderInputExample'
 *             bulk:
 *                value:
 *                  - name: "Company B"
 *                    industry: "tobacco"
 *                    email: "company@b.com"
 *                    password: "password"
 *                  - name: "Company C"
 *                    industry: "consumer-services"
 *                    email: "company_c@example.com"
 *                    password: "password"
 *     responses:
 *       200:
 *         description: Add a provider
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/ProviderExample'
 *     security:
 *       - bearerAuth: []
 */
router.post("/", providers.create);

/**
 * @swagger
 * /providers/{id}:
 *   get:
 *     description: Get a provider
 *     tags:
 *       - Providers
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the provider to get
 *         required: true
 *         schema:
 *           type: string
 *         example: "company-a-ltd"
 *     responses:
 *       200:
 *         description: Get a provider
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/ProviderExample'
 */
router.get("/:id", providers.findOne);

/**
 * @swagger
 * /providers/{id}:
 *   put:
 *     description: Modify a provider
 *     tags:
 *       - Providers
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the provider to modify
 *         required: true
 *         schema:
 *           type: string
 *         example: "company-a-ltd"
 *     requestBody:
 *       description: Provider account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProviderUpdateInput'
 *           examples:
 *             default:
 *               value:
 *                  industry: "tobacco"
 *                  urls: [
 *                    {
 *                      name: "Company Site (old)",
 *                      url: "https://example.com"
 *                    },
 *                    {
 *                      name: "Company New Site",
 *                      url: "https://example.com/new"
 *                    }
 *                  ]
 *     responses:
 *       200:
 *         description: Updated a provider
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/ProviderExample'
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", providers.update);

/**
 * @swagger
 * /providers/{id}:
 *   delete:
 *     description: Delete a provider
 *     tags:
 *       - Providers
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the provider to modify
 *         required: true
 *         schema:
 *           type: string
 *         example: "company-a-ltd"
 *     responses:
 *       200:
 *         description: Deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deleted successfully."
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", providers.delete);

module.exports = router;
