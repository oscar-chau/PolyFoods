export enum MealType {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner"
}

type Meal = {
  id?: number;
  user_id: number;
  mtype?: MealType;
  meal_date: Date;
};

export default Meal;
