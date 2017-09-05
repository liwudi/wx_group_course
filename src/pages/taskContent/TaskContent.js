/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/common.css';
import './css/taskContent.css';
import TopBanner from '../../components/TopBanner';
import Button from '../../components/Button';
import NewTask from '../../components/NewTask';
export default class TaskContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[]
        }
    }
    renderContent(){
        return (
            <div>
                <textarea placeholder="请输入作业内容" className="textArea"></textarea>
            </div>
        )
    }
    render(){
        return(
            <div className="pageBox">
                <TopBanner title="作业内容" router={this.props.history} />
                <div className="marginTop">
                    {
                        this.renderContent()
                    }
                </div>
                <div className="buttonContainer center">
                    <Button style={{width:'90%'}} />
                </div>
            </div>
        )
    }
}