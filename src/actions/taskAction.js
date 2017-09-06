/**
 * Created by mapbar_front on 2017/9/6.
 */
import { ADDTSAK_CONTENT } from './types';

export function taskContent(taskContent) {
    return {
        type:ADDTSAK_CONTENT,
        taskContent
    }
}