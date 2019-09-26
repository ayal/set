const uuid = (() => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
});

const uuid2 = (() => {
  return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
});

const getAllSubsets = 
      theArray => theArray.reduce(
        (subsets, value) => subsets.concat(
          subsets.map(set => [value,...set])
        ),
        [[]]
      );

const getAllSubsetsSizeK = (arr,k)=>{
  return getAllSubsets(arr).filter(s=>s.length === k);
};


const getSets = (cards)=> {
  var threes = getAllSubsetsSizeK(cards, 3);
  let sets = threes.filter(three=>{
    var eqs = 0;
    var neqs = 0;
    for (var i = 0; i < 4; i++) {
      if (three[0][i] === three[1][i] && three[1][i] === three[2][i]) {
	eqs++;
      }
      
      if (three[0][i] !== three[1][i] && three[1][i] !== three[2][i] && three[2][i] !== three[0][i]) {
	neqs++;
      }
    }

    if (eqs + neqs === 4) {
      return three;
    }
  });
  
  return sets;
};


export {uuid, uuid2, getAllSubsets, getAllSubsetsSizeK, getSets};
