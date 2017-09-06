/**
 * Created by mapbar_front on 2017/9/6.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/common.css';
import './css/taskDetail.css'
import TopBanner from '../../components/TopBanner';

export default class TaskDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskTitle:'数学',
            taskContent:'我是一个小逗比，咿呀咿呀咦！！'
        }
    }
    render(){
        return (
            <div className="pageBox">
                <TopBanner title="作业详情" router={this.props.history} />
                <div className="fx1 bgWhite borderTop">
                    <div className="detail">
                        <div className='center marginTop'>
                            <img className="img" src="/src/assets/images/TaskDetail.jpg" />
                        </div>
                        <div className="center padding">{this.state.taskTitle||'任务标题'}</div>
                        <div
                            className="title margin padding note smallSize"
                            style={{marginTop:0,paddingTop:0}}
                        >
                            {this.state.taskContent||'任务内容'}
                        </div>
                    </div>
                    <div className="note smallSize center padding" style={{backgroundColor:'#f1f1f1'}}>
                        ---- 暂无提交 ----
                    </div>
                </div>
            </div>
        )
    }
}