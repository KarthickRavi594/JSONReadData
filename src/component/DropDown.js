import React from 'react'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { Row } from 'simple-flexbox';
import axios from 'axios';

class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownValueButton: ['Terminal', 'Category', 'Manager', 'Brand', 'Code', 'Company'],
            Terminal: [],
            Category: [],
            Manager: [],
            Brand: [],
            Code: [],
            Company: []
        }
        this.dropDownList = this.dropDownList.bind(this);
        this.getValueObject = this.getValueObject.bind(this);
    }
    dropDownList(target) {
        let data = []
        const url = `http://localhost:3456/${target}`
        axios.get(url)
            .then(res => {
                res.data.map(x => {
                    let obj = {}
                    obj.label = x
                    obj.value = x
                    data.push(obj)
                })
            })
        return data;
    }

    duplicateCheck(array, obj) {
        let flag = 0;
        array.map(x => {
            if (x.label === obj.label) {
                flag = 1;
            }
        })
        return flag;
    }
    changeValue(value, e) {
        if (e.length > 0) {
            if (this.state.dropdownValueButton.includes(value)) {
                if (e.length > this.state[value].length) {
                    e.map(x => {
                        if (!this.duplicateCheck(this.state[value], x)) {
                            this.state[value].push(x)
                        }
                    })
                }
                if (e.length < this.state[value].length) {
                    this.state[value] = this.state[value].filter(x => e.some(val => x.value === val.value))
                }
            }
        }
        if (e.length == 0) {
            if (this.state.dropdownValueButton.includes(value)) {
                this.state[value] = []
            }
        }
    }
    getValueObject() {
        this.receivedObjectValue(this.state)
    }

    receivedObjectValue(value) {
        axios.post('http://localhost:3456/Table', value).then(function (response) {
            console.log(response);
        })
    }

    render() {
        const dropDownDesign = this.state.dropdownValueButton.map((values, index) => {
            const options = this.dropDownList(values);
            return (
                <div>
                    <ReactMultiSelectCheckboxes key={index} options={options} placeholderButtonLabel={values} onChange={this.changeValue.bind(this, values)} />
                </div>
            )
        })
        return (
            <div className="content">
                <Row className="component">
                    {dropDownDesign}
                </Row>
                <input type='submit' onClick={this.getValueObject} />
            </div>
        )
    }
}

export default DropDown;