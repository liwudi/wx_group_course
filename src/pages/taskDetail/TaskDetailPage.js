/**
 * Created by mapbar_front on 2017/9/6.
 */
import React,{ Component } from 'react';
import '../../css/common.css';
import './css/taskDetail.css'
import TopBanner from '../../components/TopBanner';
import ViewForRightDom from '../../components/ViewForRightDom';
import Modal2 from '../../components/Modal2';

import { getTaskFinishedList,findTaskSubjectById,deleteTaskFinished,saveFinishedComment,deleteFinishedComment,saveFinishedPraise,deleteFinishedPraise } from '../../services/AppServices';
import { deleteItemByIndex } from '../../assets/utils/utils';
export default class TaskDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskTitle:'数学',
            taskContent:'我是一个小逗比，咿呀咿呀咦！！',
            compoleteNumber:3,
            numberList:[],
            isShowDelete:false
        }
    }
    closeDeleteModal(){
        this.setState({
            isShowDelete:false
        })
    }
    closeSpeak(){
        this.setState({
            isSpeak:false
        })
    }
    deleteEvent(){
        let finishedId = this.state.numberList[this.state.currentDeleteIndex].id;
        deleteTaskFinished(finishedId).then(res => {
            this.fetchData();
            this.closeDeleteModal();
        })
    }
    speakEvent(){
        let finishedId = this.state.numberList[this.state.currentDeleteIndex].id;
        let content = this.state.inputComment || '';
        saveFinishedComment(content,finishedId).then(res => {
            console.log('saveFinishedComment',res);
            this.fetchData();
            this.closeSpeak();
        })
    }
    deleteCommentEvent(id){

        deleteFinishedComment(id).then(res => {
            console.log('deleteFinishedComment',res);
            this.fetchData();
        })
    }
    pramiseEvent(id){
        if(this.time){
            if(new Date().getTime() - this.time < 1000){
                console.log('小于一秒，点击无效');
                return
            }else{
                console.log('大于一秒，执行')
                this.time = new Date().getTime();
            }
        }else{
            this.time = new Date().getTime();
            //console.log('第一次点击时间',this.time);
        }
        let userId = 100;
        saveFinishedPraise(id,userId).then(res => {
            console.log('saveFinishedPraise',res);
            this.fetchData();
        })
        //@todo:这里要做删除功能，主要看后面接口如何设计
        // deleteFinishedPraise(id).then(res => {
        //     console.log('deleteFinishedPraise',res);
        //     this.fetchData();
        // })
    }
    fetchData(){
        let taskSubjectId = this.props.match.params.id;
        let page = 1;
        let rows = 10;
        getTaskFinishedList(taskSubjectId,page,rows).then(res => {
            console.log('getTaskFinishedList',res);
            res = JSON.parse(res);
            this.setState({
                compoleteNumber:res.total,
                numberList:res.rows

            })
        });
        findTaskSubjectById(taskSubjectId).then(res => {
            res = JSON.parse(res);
            this.setState({
                taskTitle:res.subject,
                taskContent:res.content
            })
        });
    }
    componentDidMount(){
        this.fetchData();
    }
    renderSpeak(){
        return (
            <div className="rowCenter" style={{width:'100%',height:'50px',backgroundColor:'#f1f1f1',justifyContent:'space-around'}}>

                <img className="iconDefault" style={{width:'40px',height:'25px'}} src="/src/assets/images/speaks.png" />
                <input
                    onChange={(e)=>this.setState({inputComment:e.target.value})}
                    type="text"
                    placeholder="请输入评论"
                    className="inputDefault paddingLeft"
                    style={{width:"60%",height:'30px',backgroundColor:'#cccccc',borderRadius:'5px'}} />
                <span
                    className="colorWhite bgOrange paddingLeft paddingRight"
                    style={{borderRadius:'10px',padding:'3px 10px'}}
                    onClick={()=>this.speakEvent()}
                >发送</span>
            </div>
        )
    }
    render(){
        return (
            <div className="pageBox">
                <TopBanner title="作业详情" router={this.props.history} />
                <div className="fx1 bgWhite borderTop" style={{overflow:'auto'}}>
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
                        ---- {this.state.compoleteNumber ? this.state.compoleteNumber+"人提交":"暂无提交"} ----
                    </div>
                    {
                        this.state.numberList.map((item,index)=>{
                            return (
                                <div key={index} className="list padding">
                                    <div className="item disFx borderBottom paddingBottom">
                                        <div className="itemLeft">
                                            <img src={require('../../assets/images/group.png')} style={{width:'30px',height:'30px',borderRadius:'50%'}}/>
                                        </div>
                                        <div className="itemRight fx1">
                                            <div className="disFx">
                                                <div className="fx1">
                                                    <p className="colorNote1 baseSize">{item.title || '山花烂漫时'}</p>
                                                    <p className="colorNote smallSize">{item.time || '2017-8-29 15:02:02'}</p>
                                            </div>
                                                <div onClick={()=>{this.setState({isShowDelete:true,currentDeleteIndex:index})}} className="bigSize marginRight">...</div>
                                            </div>
                                            <p className="marginTop">{item.content}</p>
                                            <div>

                                            </div>
                                            <div className="taskImages disFx marginTop">
                                                {
                                                    item.taskImage && item.taskImage.map((i,idx)=>{
                                                        return (
                                                            <img
                                                                key={idx}
                                                                className="marginRight"
                                                                style={{width:'70px',height:'70px'}}
                                                                src={i}
                                                            />
                                                        )
                                                    })
                                                }

                                            </div>
                                            <div className="padding disFx">
                                                <div className="rowCenter" style={{width:'100%',height:'40px',overflow:'hidden'}}>
                                                    <img
                                                        onClick={()=>this.setState({isSpeak:true,currentDeleteIndex:index})}
                                                        src={require("../../assets/images/comments.png")}
                                                        className="iconDefault"
                                                    />
                                                    <span onClick={()=>this.setState({isSpeak:true,currentDeleteIndex:index})} className="marginLeft">点评</span>
                                                </div>
                                                <div className="rowCenter" style={{width:'100%',height:'40px',overflow:'hidden'}}>
                                                    <img
                                                        src={require("../../assets/images/pramise.png")}
                                                        className="iconDefault"
                                                        onClick={() => this.pramiseEvent(item.id)}
                                                    />
                                                    <span className="marginLeft">{item.praiseCount || 0}</span>
                                                </div>
                                            </div>
                                            {
                                                item.commentList && item.commentList.map((item,idx)=>{
                                                    return (
                                                        <div key={idx} className="border marginRight disFx">
                                                            <p className="padding margin fx1">
                                                                <span>{item.name || 'liwudi'}:</span>
                                                                <span>{item.content || '评论的内容'}</span>
                                                            </p>
                                                            <p onClick={() => this.deleteCommentEvent(item.id)} className="marginTop colorRed paddingTop" style={{width:'60px'}}>删除</p>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
                {
                    this.state.isShowDelete?
                        <Modal2 onCancel={()=>this.setState({isShowDelete:false})} >
                            <ViewForRightDom title="删除" onClick={()=>this.deleteEvent()} />
                            <div
                                className="center bgWhite"
                                style={{width:'100%',height:"50px",borderTop:'10px solid #cccccc'}}
                                onClick={()=>this.setState({isShowDelete:false})}
                            >
                                取消
                            </div>
                        </Modal2>:null
                }
                {
                    this.state.isSpeak ? this.renderSpeak() : null
                }
            </div>
        )
    }
}