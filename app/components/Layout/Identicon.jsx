
import React, {PropTypes} from "react";
import BaseComponent from "../BaseComponent";
import {hash} from "yoyowjs-lib";
import jdenticon from "../../utils/jdenticon";

var canvas_id_count = 0;

class Identicon extends BaseComponent {
    constructor(props) {
        super(props);
        this.canvas_id = "identicon_" + (this.props.account || "") + (++canvas_id_count);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.size.height !== this.props.size.height || nextProps.size.width !== this.props.size.width || nextProps.account !== this.props.account;
    }

    repaint() {
        if (this.props.account) jdenticon.updateById(this.canvas_id);
        else {
            let ctx = this.refs.canvas.getContext('2d');
            ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
            let size = ctx.canvas.width;
            ctx.clearRect(0, 0, size, size);
            ctx.fillRect(0, 0, size, size);
            ctx.clearRect(0 + 1, 0 + 1, size - 2, size - 2);
            ctx.font = `${size}px sans-serif`;
            ctx.fillText("?", size / 4, size - size / 6);
        }
    }

    componentDidMount() {
        this.repaint();
    }

    componentDidUpdate() {
        this.repaint();
    }

    render() {
        let {account} = this.props;
        let {height, width} = this.props.size;
        let ch = height, cw = width;
        let hashStr = account ? hash.sha256(account).toString("hex") : null;
        if (height < 30) height = 30;
        if (width < 30) width = 30;
        return (
            <canvas id={this.canvas_id} ref="canvas" width={width} style={{width: cw + "px", height: ch + "px"}}
                    height={height} data-jdenticon-hash={hashStr}/>
        );
    }
}

Identicon.propTypes = {
    size: PropTypes.object.isRequired,
    account: PropTypes.string
};
export default Identicon;
 