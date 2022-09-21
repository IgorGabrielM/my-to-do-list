import {CriticalityLevelModel} from "./criticalityLevel.model";
import {CategoryModel} from "./category.model";

export type TaskModel = {
    category: CategoryModel
    criticalityLevel: CriticalityLevelModel
    title: string
    description: string
    deadline: string
}