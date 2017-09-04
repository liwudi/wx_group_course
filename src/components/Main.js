/**
 * Created by mapbar_front on 2017/5/31.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';

import RedBull from './RedBull';
import Snacks from './Snacks';
import Spicy from './Spicy';
import Chips from './Chips';

const routes = [{
    path:'/redbull',
    component:RedBull
},{
    path:'/snacks',
    component:Snacks,
    routes:[{
        path:'/snacks/spicy',
        component:Spicy,
    },{
        path:'/snacks/chips',
        component:Chips,
    }]
}];
class RoutesWithSubRoutes extends Component{
    render(){
        return <Route path={this.props.path} render={
            ()=> <this.props.component path={this.props.path} routes={this.props.routes} />
        } />
    }
}
export default class Main extends Component{
    render(){
        return(
            <Router>
                <div>
                <ul>
                    <li><Link to="/redbull">红牛</Link></li>
                    <li><Link to="/snacks">小吃</Link></li>
                </ul>
                {
                    routes.map((route,index)=><RoutesWithSubRoutes key={index} path={route.path} component={route.component} routes={route.routes}/>)
                }
                </div>
            </Router>
        )
    }
}
