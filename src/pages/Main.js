/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import createBrowserHistory from 'history';

import Entry from './entry/Entry';
import HomePage from './home/HomePage';
import SetTaskPage from './SetTask/SetTaskPage';
import TaskContent from './taskContent/TaskContent';
import RelatedCoursePage from './relatedCourses/RelatedCoursePage';
import TaskCardPage from './taskCard/TaskCardPage';
import TaskDetailPage from './taskDetail/taskDetailPage';

import MyTask from './myTask/MyTask';
const history = createBrowserHistory;
export default class Main extends Component{
    render(){
        return(

            <Router history={history}>
                <div className="disFx fx1" style={{width:"100%",height:'100%'}}>
                    <Route exact path="/" component={Entry}/>
                    <Route path="/home" component={HomePage}/>

                    <Route path="/setTaskPage" component={SetTaskPage} />
                    <Route path="/taskContent" component={TaskContent} />
                    <Route path="/relatedCourses" component={RelatedCoursePage} />
                    <Route path="/taskCard" component={TaskCardPage} />
                    <Route path="/taskDetail" component={TaskDetailPage} />

                    <Route path="/mytask" component={MyTask} />

                </div>
            </Router>
        )
    }
}
