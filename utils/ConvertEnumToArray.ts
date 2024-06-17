import type { PublicSchema } from "~/types/supabase"

export default (enumName:keyof PublicSchema['Enums']) => {
  switch(enumName){
    case 'ExerciseTypeEnum': return ["strenght_weight" , "strenght_reps" , "strenght_duration" , "cardio_duration" , "cardio_lenght" , "stretch"]
    case 'GenderEnum': return ['male', 'female']
    case 'MuscleTypeEnum': return ["main" ,"secondary"]
    case 'TrainingAimEnum': return ["flesh", "fit", "lose"]
    default: return [] as string[]
  }
}
