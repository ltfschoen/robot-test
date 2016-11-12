import React from 'react';
import './test.js'

class LikeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {likesCount : 0};
        this.onLike = this.onLike.bind(this);
    }

    componentDidMount() {
        window.test();
        console.log("Test: " + test());
        var x = new Table();
        console.log("Table: " + x);
    }

    onLike () {
        let newLikesCount = this.state.likesCount + 1;
        this.setState({likesCount: newLikesCount});
    }

    render() {
        return (
            <div>
                Likes : <span>{this.state.likesCount}</span>
                <div><button onClick={this.onLike}>Like Me</button></div>
            </div>
        );
    }

}

export default LikeComponent;