/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/common.css';
import './css/taskCardPage.css';
import TopBanner from '../../components/TopBanner';
import NewTask from '../../components/NewTask';
import Button from '../../components/Button';
export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[]
        }
    }
    renderContent(){
        return (
            <div>
                <p className="center">暂未布置作业，点击下方按钮为</p>
                <p className="center">你的学员布置作业</p>
            </div>
        )
    }
    gotoTop(history){
        this.props.history.push("/")

    }
    render(){
        console.log('当前history',this.props.history);
        return(
            <div className="pageBox">
                <TopBanner title="作业卡" router={this.props.history} />
                <div className="fx1 center">
                    {
                        this.renderContent()
                    }
                </div>
                <div className="cardBottom bgWhite paddingTop">
                    <p className="center">长按保存图片，可在课程内发送</p>
                    <p className="center">学员扫码后即可领取作业</p>
                    <div className="center marginTop">
                        <Button onClick={()=>{this.gotoTop()}} title="返回作业管理" style={{width:'50%',height:'30px'}} />
                    </div>
                    <div style={{height:'40px'}}></div>
                </div>
            </div>
        )
    }
}