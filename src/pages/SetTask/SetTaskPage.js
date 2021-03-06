/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import '../../css/common.css';
import '../../css/setTaskPage.css';
import TopBanner from '../../components/TopBanner';
import Modal from '../../components/Modal';

import ViewForRightArrow from '../../components/ViewForRightArrow';

import { findTaskSubjectById,saveTaskSubject,updateTaskSubject } from '../../services/AppServices';


import {
    TYPES,
    TaskActions
} from '../../actions/index';
class SetTaskPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskTitle:props.taskStore.taskTitle,

            isChecked:false,
            isShowModal:false,
            taskContent:props.taskStore.taskContent
        }
    }
    getCardEvent(){
        let id = this.props.taskStore.taskId;
        let userid = 123;
        let subject = this.props.taskStore.taskTitle || this.state.taskTitle;
        let content = this.props.taskStore.taskContent || this.state.taskContent;

        this.isGetFromEdit() && updateTaskSubject(subject,content,id,userid).then(res => {
            this.props.history.goBack();
        });
        !this.isGetFromEdit() && saveTaskSubject(subject,content,userid).then(res => {
            console.log('saveTaskSubject',res);
            this.props.history.push('/taskCard')
        });
    }
    changeStateEvent(){
        return;

        this.setState({
            isChecked:!this.state.isChecked
        })
    }
    isGetFromEdit(){
        console.log(this.props.match.params.isEditPage);
        if(this.props.match.params.isEditPage === 'true'){
            return true
        }else{
            return false
        }
        //return Boolean(this.props.match.params.isEditPage);
    }
    confirmEvent() {
        const dealInput = (value) => {
            this.props.dispatch(TaskActions.taskTitle(value));
            this.setState({
                isShowModal:false
            })
        };
        this.state.inputValue && dealInput(this.state.inputValue);
    }
    cancelEvent(){
        this.setState({isShowModal:false})
    }
    fetchData(){

        findTaskSubjectById(this.props.taskStore.taskId).then(res => {
            console.log('获取的数据',res);
            res = JSON.parse(res);
            //this.props.dispatch(TaskActions.taskTitle(res.subject));
            this.setState({
                taskTitle:res.subject,
                taskContent:res.content
            })
        })
    }

    componentDidMount(){
        //alert(1);
        this.isGetFromEdit() && this.fetchData();
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
    // renderModal(){
    //     return (
    //         <div style={{width:"100%",height:"100%",position:"absolute",left:0,top:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
    //             <div className="bgWhite" style={{width:'70%',position:'absolute',left:"15%",top:"30%",borderRadius:'10px'}}>
    //                 <p className="center padding">作业标题</p>
    //                 <div className="inputBox center" >
    //                     <div className="inputContainer center" style={{backgroundColor:'#f1f1f1'}}>
    //                         <input className="inputDefault" type="text" placeholder="请输入标题" value={this.state.taskTitle} autoFocus={true} />
    //                     </div>
    //
    //                 </div>
    //                 <div className="borderTop disFx marginTop">
    //                     <div className="fx1 center padding borderRight">取消</div>
    //                     <div className="fx1 center padding colorRed">确定</div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }


    render(){
        const _rightView =  () => {
            return (
                <div className="rowCenter">
                    <span className="note">{this.props.taskStore.taskTitle || this.state.taskTitle || '请输入标题'}</span>
                    <img className="iconRightArrow" src={require("../../assets/images/rightArrow.png")} />
                </div>
            )

        };
        const _rightViewContent = () => {
            return (
                <div className="rowCenter">
                    <span className="note">{this.props.taskStore.taskContent || this.state.taskContent || '请输入内容'}</span>
                    <img className="iconRightArrow" src={require("../../assets/images/rightArrow.png")} />
                </div>
            )
        };
        return(
            <div className="pageBox" style={{position:'relative'}}>
                <TopBanner title="布置作业" router={this.props.history}/>
                <div className="myContent">
                    <div className="marginTop">
                        <ViewForRightArrow
                            title='作业标题'
                            style={{borderBottom:'1px solid #cccccc',justifyContent:'space-between'}}
                            rightView={()=>_rightView()}
                            onClick={()=>this.setState({isShowModal:true})}
                        />
                        <ViewForRightArrow
                            title='作业内容'
                            onClick={()=>{this.props.history.push(`/taskContent/${true}`)}}
                            rightView={()=>_rightViewContent()}
                            style={{justifyContent:'space-between'}}
                        />
                    </div>
                    <div className="marginTop">
                        <ViewForRightArrow
                            title='关联课程'
                            style={{borderBottom:'1px solid #cccccc',justifyContent:'space-between'}}
                            prompt="未关联"
                            onClick={()=>{return;this.props.history.push('/relatedCourses')}}
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

                        onClick={()=>{this.getCardEvent()}}
                    >保存并且获取作业卡</div>
                </div>
                {
                    this.state.isShowModal ?
                        <Modal
                            onCancel={()=>this.cancelEvent()}
                            onConfirm={()=>this.confirmEvent()}
                        >
                            <div className="inputContainer center" style={{backgroundColor:'#f1f1f1'}}>
                                <input onChange={(e)=>{console.log(e.target.value);this.setState({inputValue:e.target.value})}} className="inputDefault" type="text" placeholder="请输入标题" autoFocus={true} />
                            </div>
                        </Modal> : null
                }
            </div>
        )
    }
}

export default connect((store)=>{
    console.log(store);
    return {
        taskStore:store.taskStore
    }
})(SetTaskPage)