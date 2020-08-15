import React, {Component} from "react";

export default class PageTemplate extends Component {

    render() {
        return (
            <div>
                Page Template
                <div>{this.props.children}</div>
            </div>
        );
    }

}