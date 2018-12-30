import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Modal } from 'semantic-ui-react';
import { submitAmount, openModal, closeModal } from '../actions';

class AmountModal extends Component {
    state = {
        amountValue: "",
        warning: "",
    }

    onFormChange = (event) => {
        if (!isNaN(event.target.value) &&
            event.target.value >= 0 &&
            !event.target.value.includes(".")) {
            this.setState({
                amountValue: event.target.value,
                warning: "",
            })
        } else {
            this.setState({
                warning: "Only numbers (integers) allowed"
            })
        }
    }

    render() {
        return (
            <Modal
                open={this.props.isModalOpen}
                onClose={this.props.closeModal}
                size="tiny"
            >
                <Modal.Header>Give amount of food</Modal.Header>
                <Modal.Content>
                    <h3>{this.props.foodData.name}</h3>
                    <p>Amount of food (grams):</p>
                    <Input
                        label={{ basic: true, content: 'grams' }}
                        labelPosition='right'
                        className="ui input"
                        type="text"
                        name="amountValue"
                        value={this.state.amountValue}
                        onChange={this.onFormChange}
                        maxLength="4"
                        size="tiny"
                    />
                    <p className="warn">{this.state.warning}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        onClick={() => {
                            this.props.submitAmount(this.state.amountValue, this.props.foodData);
                            this.clearForm();
                        }
                        }>Submit
                    </Button>
                    <Button onClick={() => {
                        this.props.closeModal();
                        this.clearForm();
                    }
                    }>Cancel</Button>
                </Modal.Actions>
            </Modal>
        )
    }

    clearForm = () => {
        this.setState({
            amountValue: "",
        })
    }
}

const mapStateToProps = (state) => {
    return {
        params: state.params,
        searchResultList: state.searchResultList,
        isModalOpen: state.isModalOpen,
        foodData: state.foodToBeModified,
    }
}

export default connect(mapStateToProps, { submitAmount, openModal, closeModal })(AmountModal);
