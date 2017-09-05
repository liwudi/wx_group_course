/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/common.css';
import '../../css/setTaskPage.css';
import TopBanner from '../../components/TopBanner';
import NewTask from '../../components/NewTask';

import ViewForRightArrow from '../../components/ViewForRightArrow';

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskTitle:null,

            isChecked:true
        }
    }
    changeStateEvent(){
        this.setState({
            isChecked:!this.state.isChecked
        })
    }
    renderTab(){
        if(this.state.isChecked){
            return (
                <div className="center" onClick={()=>this.changeStateEvent()}>
                    <div className="switchChecked">
                        <div className="switchCicleChecked"></div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="center" onClick={()=>this.changeStateEvent()}>
                    <div className="switch">
                        <div className="switchCicle"></div>
                    </div>
                </div>
            )
        }

    }
    render(){
        const _rightView = function () {
            return (
                <div className="rowCenter">
                    <span className="note">请输入标题</span>
                    <img className="iconRightArrow" src="/src/assets/images/rightArrow.png" />
                </div>
            )

        };

        return(
            <div className="pageBox">
                <TopBanner title="布置作业" router={this.props.history}/>
                <div className="myContent">
                    <div className="marginTop">
                        <ViewForRightArrow
                            title='作业标题'
                            style={{borderBottom:'1px solid #cccccc',justifyContent:'space-between'}}
                            rightView={()=>_rightView()}
                        />
                        <ViewForRightArrow
                            title='作业内容'
                            onClick={()=>{this.props.history.push('/taskContent')}}
                            style={{justifyContent:'space-between'}}
                        />
                    </div>
                    <div className="marginTop">
                        <ViewForRightArrow
                            title='关联课程'
                            style={{borderBottom:'1px solid #cccccc',justifyContent:'space-between'}}
                            prompt="未关联"
                            onClick={()=>{this.props.history.push('/relatedCourses')}}
                        />
                        <ViewForRightArrow
                            title='仅课程报名者可交作业'
                            style={{justifyContent:'space-between'}}
                            rightView={()=>this.renderTab()}
                        />
                    </div>
                </div>
                <div className="buttonContainer center">
                    <div
                        className="bigBtn center bgred"
                        onClick={()=>{this.props.history.push('/taskCard')}}
                    >保存并且获取作业卡</div>
                </div>
            </div>
        )
    }
}