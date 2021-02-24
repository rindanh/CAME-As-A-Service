import React from 'react';
import { connect } from 'react-redux';
import { Container, Row } from "react-bootstrap";
import Header from './Header';

import { history } from '../_helpers';
import { alertActions } from '../_actions'

class PageWrapper extends React.Component {

	constructor(props) {
		super(props)

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
	}

	render() {
		const { alert } = this.props;
        return (
            <div>
                <Header />
                <br />
                <Container>
                    <Row className="justify-content-center">
                        <div className="col-md-6 col-md-offset-3">
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                        </div>
                    </Row>
                    {this.props.children}
                </Container>
            </div>

		)
	}

}

const mapStateToProps = state => { 
    return ({
        alert: state.alert
    })
};

const mapDispatchToProps = {
  clearAlerts: alertActions.clear
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageWrapper);