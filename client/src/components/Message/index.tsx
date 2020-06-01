import React from 'react';
import { MessageWrapper } from './index.styled';

class Message extends React.PureComponent<any> {
    constructor(props) {
        super(props);
    }
    render() {
        const {status} = this.props; console.log(status);
        if(!status || status === undefined) {
            return null;
        }

        const { type, message } = status;
        return (
            <MessageWrapper type={type}>
                { message }
            </MessageWrapper>
        )
    }
}

export default Message;