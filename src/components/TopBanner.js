/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import '../css/common.css';
export default class TopBanner extends Component{
    constructor(props){
        super(props);
    }
    goBack(){
        console.log('goback');
        console.log(this.props.router);
        console.log(this.props.history);
        this.props.router.goBack();
    }
    leftView(){
        return(
            <span onClick={() => this.goBack()} className="topBannerLeft center">back</span>
        )
    }
    render(){
        return (
            <div className='topBanner rowCenter'>
                {this.leftView()}
                <span>
                    {this.props.title?this.props.title:"默认标题"}
                </span>
            </div>
        )
    }
}