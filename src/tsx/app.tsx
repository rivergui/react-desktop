/// <reference path="../../typings/tsd.d.ts" />
import * as React from "react";
import * as ReactDOM from "react-dom";
require('../css/app.css');
import * as desktop from "./component/desktop.tsx";
import * as config from "./config.ts";

class App extends React.Component<{},
    {
        errors?: string[],
        renderCount?: number
    }> {
    constructor() {
        super();
        let self = this;
        self.state = { errors: [], renderCount: 0 };
        config.config.error = (msg) => {
            self.state.errors.push(msg);
            self.setState({ errors: self.state.errors });
            var index = setTimeout(function () {
                let tmp = self.state.errors;
                let n = tmp.indexOf(msg);
                self.setState({ errors: tmp.slice(0, n).concat(tmp.slice(n + 1, tmp.length)) });
                clearTimeout(index);
            }, 1500);
        };
    }
    render() {
        let self = this;
        let errorBox: any;
        if (self.state.errors) {
            errorBox = self.state.errors.map((error, index) => <div key={index} style={{
                position: 'fixed',
                top: 55 * index + 20,
                right: 20,
                width: 300,
                height: 53,
                zIndex: 9999999
            }} className="alert alert-danger alert-dismissible fade in" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                <strong>{  error}</strong>
            </div>);
        }
        return <div style={{
            width: '100%',
            height: '100%'
        }}>
            <desktop.Desktop  appIcons={null} showStartmenu={true}/>
            {errorBox}
        </div>;
    }
}
(() => {
    document.body.removeChild(document.getElementById("preloading-style"));
    document.body.removeChild(document.getElementById("precontainer"));
    let container = document.getElementById("container");
    container.style.display = '';
    ReactDOM.render(<App />, container);
})();
