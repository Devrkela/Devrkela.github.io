/**
  Tableau à double dimension du type.
  [exercice_type_dictionary][exercice_id]
**/

window.exercice_record = {
  exercice_info: "exercice_info_id",
  date: "Date",
  level: "weight_list[list][level]",
  xp: [
    {
      value:"number",
      type:"xp_type_dictionary_id",
      next:"number",
    }
  ],
  /**
    Peut être du texte ou de l'audio.
  **/
  commentary:[{
    file:'File',
    for_xp: ["xp_id"]
  }]
};

xp_type_dictionary = ["string"];