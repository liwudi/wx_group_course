/**
 * Created by mapbar_front on 2017/9/7.
 */
import React,{ Component } from 'react';
import '../../css/common.css';
import TopBanner from '../../components/TopBanner';
import Button from '../../components/Button';


import { saveTaskFinished } from '../../services/AppServices';

import { connect } from 'react-redux';

class MyTask extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskTitle:'数学',
            taskContent:'我是一个小逗比，咿呀咿呀咦！！',

        }
    }
    fetchData(){
        let content = this.state.taskContent;
        let taskSubjectId = 1;
        let userId = 100;
        saveTaskFinished(content,taskSubjectId,userId).then(res => {
            console.log(res);
        })
    }
    componentDidMount(){
        this.fetchData();
    }
    render(){
        return (
            <div className="pageBox">
                <TopBanner title="我的作业" router={this.props.history} />
                <div className="fx1 bgWhite borderTop">
                    <div className="detail">
                        <div className='center marginTop'>
                            <img className="img" src={require("../../assets/images/TaskDetail.jpg")} />
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
                        ---- {this.state.compoleteNumber ? this.state.compoleteNumber+"人提交":"暂无提交"} ----
                    </div>

                    <div className="center marginTop">
                        <Button onClick={()=>this.props.history.push(`/taskContent/${false}`)} title="交作业" style={{width:"100px",height:"35px"}} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((store) => {
    console.log(store);
    return {
       store: store
    }
})(MyTask)