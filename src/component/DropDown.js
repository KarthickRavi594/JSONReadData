import React from 'react'
import MultiSelect from "@kenshooui/react-multi-select";
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
        };
        this.dropDownList = this.dropDownList.bind(this);
        this.getValueObject = this.getValueObject.bind(this);
    }

    dropDownList(target) {
        let data = []
        const url = `http://localhost:3456/${target}`
        axios.get(url)
            .then(res => {
                res.data.map((x,index) => {
                    let obj = {}
                    obj.id = index
                    obj.label = x
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
                    this.state[value] = this.state[value].filter(x => e.some(val => x.label === val.label))
                }
            }
        }
        if (e.length === 0) {
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
            const items = this.dropDownList(values);
            let name={
                searchPlaceholder : values
            }
            return (
                <div>
                    <MultiSelect key={index} items={items} messages={name} onChange={this.changeValue.bind(this, values)} showSelectedItems={false} />
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