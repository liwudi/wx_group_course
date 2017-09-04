/**
 * Created by mapbar_front on 2017/5/31.
 */
import React,{ Component } from 'react';

import { Link, Route } from 'react-router-dom';

class RouteWithSubRoutes extends Component{
    render(){
        //console.log(this.props);
        return (
            <Route path={this.props.path} render={() => (

                <this.props.component path={this.props.path} routes={this.props.routes}/>
            )}/>
        )
    }
}
export default class Snacks extends Component{
    render(){
        let routes = this.props.routes;
        return (
            <div>
                <h2>小吃</h2>
                <ul>
                    <li><Link to="/snacks/spicy">辣条</Link></li>
                    <li><Link to="/snacks/chips">薯片</Link></li>
                </ul>

                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route}/>
                ))}
            </div>
        )
    }
}