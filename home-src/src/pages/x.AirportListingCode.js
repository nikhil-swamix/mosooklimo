const settingData = (data) => {
    var type = [];
    for (let i = 0; i < data.length; i++) {
      type.push(data[i].country);
    }
    type = [...new Set(type)].sort();
    var universe = "[";
    for (let i = 0; i < type.length; i++) {
      // console.log(type[i]);
      universe = universe.concat(`{"country": "${type[i]}",`);
      let tempName = [];
      let tempDesc = [];
      for (let j = 0; j < data.length; j++) {
        if (type[i] == data[j].country) {
          tempName.push(`"${data[j].name}"`);
          tempDesc.push(`"${data[j]._id}"`);
        }
      }
      universe = universe.concat(` "airports": [${tempName}],`);
      universe = universe.concat(` "ids":[${tempDesc}]},`);
    }
    universe = universe.concat("]");
    let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
    let correct = universe.replace(regex, "");
    return JSON.parse(correct);
  };


  RESULT= [{"country":"XX",airports:['a','b','c'],ids:['i1','i2','i2']]