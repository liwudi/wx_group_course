/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import createBrowserHistory from 'history';

import HomePage from './home/HomePage';
import SetTaskPage from './SetTask/SetTaskPage';
import TaskContent from './taskContent/TaskContent';
import RelatedCoursePage from './relatedCourses/RelatedCoursePage';
import TaskCardPage from './taskCard/TaskCardPage';
const history = createBrowserHistory;
export default class Main extends Component{
    render(){
        return(
            <Router history={history}>
                <div className="disFx">
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/setTaskPage" component={SetTaskPage} />
                    <Route path="/taskContent" component={TaskContent} />
                    <Route path="/relatedCourses" component={RelatedCoursePage} />
                    <Route path="/taskCard" component={TaskCardPage} />
                </div>
            </Router>
        )
    }
}
