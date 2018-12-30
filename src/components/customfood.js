import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Modal, Icon } from 'semantic-ui-react';
import { openCFmodal, closeCFmodal, addCustomFood } from '../actions';

class CustomFood extends Component {
    state = {
        amount: "",
        key: null,
        name: "",
        kcal: "",
        fat: "",
        prot: "",
        carbs: "",
        sugar: "",
        per100g: {
            kcal: 0,
            fat: 0,
            prot: 0,
            carbs: 0,
            sugar: 0,
        },
        warning: "",
    }

    render() {
        return (
            <Modal
                open={this.props.isCFmodalOpen}
                onClose={this.props.closeCFmodal}
                trigger={<Button
                    color='teal'
                    onClick={this.props.openCFmodal}
                    icon labelPosition='right'
                    ><Icon 
                    size="large"
                    name="food" 
                    />
                Add custom food</Button>}
                size="tiny">
                <Modal.Header>Add a custom food to your diary</Modal.Header>
                <Modal.Content>
                    <p>
                        <b>It is recommended to fill in every field.</b><br />
                        But if you are not interested in calculating all nutrients<br />
                        feel free to leave them empty.
                    </p>
                    <table><tbody>
                        <tr>
                            <td>Food name: </td>
                            <td>
                                <Input
                                    className="ui input"
                                    type="text"
                                    name="name"
                                    onChange={this.onFormChange}
                                    maxLength="30"
                                    size="tiny"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Amount:</td>
                            <td>
                                <Input
                                    label={{ basic: true, content: 'grams' }}
                                    labelPosition='right'
                                    className="ui input"
                                    type="text"
                                    value={this.state.amount}
                                    name="amount"
                                    onChange={this.onFormChange}
                                    maxLength="4"
                                    size="tiny"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Kalories: </td>
                            <td>
                                <Input
                                    label={{ basic: true, content: 'kcal/100 g' }}
                                    labelPosition='right'
                                    className="ui input"
                                    type="text"
                                    value={this.state.kcal}
                                    name="kcal"
                                    onChange={this.onFormChange}
                                    maxLength="7"
                                    size="tiny"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Fat:</td>
                            <td>
                                <Input
                                    label={{ basic: true, content: 'grams/100 g' }}
                                    labelPosition='right'
                                    className="ui input"
                                    type="text"
                                    value={this.state.fat}
                                    name="fat"
                                    onChange={this.onFormChange}
                                    maxLength="5"
                                    size="tiny"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Protein: </td>
                            <td>
                                <Input
                                    label={{ basic: true, content: 'grams/100 g' }}
                                    labelPosition='right'
                                    className="ui input"
                                    type="text"
                                    value={this.state.prot}
                                    name="prot"
                                    onChange={this.onFormChange}
                                    maxLength="5"
                                    size="tiny"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Carbonhydrates:</td>
                            <td>
                                <Input
                                    label={{ basic: true, content: 'grams/100 g' }}
                                    labelPosition='right'
                                    className="ui input"
                                    type="text"
                                    value={this.state.carbs}
                                    name="carbs"
                                    onChange={this.onFormChange}
                                    maxLength="5"
                                    size="tiny"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Sugars: </td>
                            <td>
                                <Input
                                    label={{ basic: true, content: 'grams/100 g' }}
                                    labelPosition='right'
                                    className="ui input"
                                    type="text"
                                    value={this.state.sugar}
                                    name="sugar"
                                    onChange={this.onFormChange}
                                    maxLength="5"
                                    size="tiny"
                                />
                            </td>
                        </tr>
                    </tbody></table> <p className="warn">{this.state.warning}</p>
                    {!this.state.name || !this.state.amount ?
                        <p className="requirements">
                            You need to fill in at least Food name<br />
                            and Amount before submitting
                        </p>
                        : <p></p>}
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        disabled={!this.state.name || !this.state.amount}
                        onClick={() => {
                            this.props.addCustomFood(this.state, this.props.usersFoodList);
                            this.clearForm();
                        }
                        }>Submit
                    </Button>
                    <Button onClick={() => {
                        this.props.closeCFmodal();
                        this.clearForm();
                    }
                    }>Cancel</Button>
                </Modal.Actions>
            </Modal>
        )
    }

    onFormChange = (event) => {
        const nutrients = ["fat", "prot", "carbs", "sugar"];
        if (event.target.name === "name") {
            this.setState({
                name: event.target.value
            })
        } else if (
            !isNaN(event.target.value) &&   // Values have to be numbers
            event.target.value >= 0     // Negative numbers not allowed
        ) {
            this.setState({
                warning: "",
            })
            if (event.target.name === "amount" &&
                !event.target.value.includes(".") // Decimal numbers not allowed
            ) {
                this.setState({
                    amount: event.target.value
                })
            } else if (
                event.target.name === "kcal" &&
                event.target.value < 1000 &&   // Over 1000 kcal/100g is impossible 
                !event.target.value.includes(".") 
            ) {
                this.setState({
                    kcal: event.target.value
                })
            } else if (
                nutrients.includes(event.target.name) &&
                event.target.value <= 100 // Over 100g/100g is impossible
            ) {
                this.setState({
                    [event.target.name]: event.target.value,
                })
            }
        } else if (isNaN(event.target.value)) {
            this.setState({
                warning: "NOTE: Only numbers allowed (except on Food name)",
            })
        }
    }

    clearForm = () => {
        this.setState({
            amount: "",
            key: null,
            name: "",
            kcal: "",
            fat: "",
            prot: "",
            carbs: "",
            sugar: "",
            per100g: {
                kcal: 0,
                fat: 0,
                prot: 0,
                carbs: 0,
                sugar: 0,
            },
            warning: "",
        })
    }
}

const mapStateToProps = (state) => {
    return {
        usersFoodList: state.usersFoodList,
        isCFmodalOpen: state.isCFmodalOpen,
    }
}

export default connect(mapStateToProps, { openCFmodal, closeCFmodal, addCustomFood })(CustomFood);
