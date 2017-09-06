/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/common.css';
import '../../css/setTaskPage.css';
import TopBanner from '../../components/TopBanner';
import NewTask from '../../components/NewTask';
import Modal from '../../components/Modal';

import ViewForRightArrow from '../../components/ViewForRightArrow';

class SetTaskPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskTitle:null,

            isChecked:false,
            isShowModal:false,
            taskContent:props.taskStore.taskContent
        }
    }
    changeStateEvent(){
        this.setState({
            isChecked:!this.state.isChecked
        })
    }
    confirmEvent() {
        const dealInput = (value) => {
            this.setState({
                taskTitle:value,
                isShowModal:false
            })
        };
        this.state.inputValue && dealInput(this.state.inputValue);
    }
    cancelEvent(){
        this.setState({isShowModal:false})
    }


    componentDidMount(){
        //
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
    renderModal(){
        return (
            <div style={{width:"100%",height:"100%",position:"absolute",left:0,top:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
                <div className="bgWhite" style={{width:'70%',position:'absolute',left:"15%",top:"30%",borderRadius:'10px'}}>
                    <p className="center padding">作业标题</p>
                    <div className="inputBox center" >
                        <div className="inputContainer center" style={{backgroundColor:'#f1f1f1'}}>
                            <input className="inputDefault" type="text" placeholder="请输入标题" value={this.state.taskTitle} autoFocus={true} />
                        </div>

                    </div>
                    <div className="borderTop disFx marginTop">
                        <div className="fx1 center padding borderRight">取消</div>
                        <div className="fx1 center padding colorRed">确定</div>
                    </div>
                </div>
            </div>
        )
    }


    render(){
        const _rightView =  () => {
            return (
                <div className="rowCenter">
                    <span className="note">{this.state.taskTitle || '请输入标题'}</span>
                    <img className="iconRightArrow" src="/src/assets/images/rightArrow.png" />
                </div>
            )

        };
        const _rightViewContent = () => {
            return (
                <div className="rowCenter">
                    <span className="note">{this.state.taskContent || '请输入标题'}</span>
                    <img className="iconRightArrow" src="/src/assets/images/rightArrow.png" />
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
                            onClick={()=>{this.props.history.push('/taskContent')}}
                            rightView={()=>_rightViewContent()}
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
    console.log(store)
    return {
        taskStore:store.taskStore
    }
})(SetTaskPage)