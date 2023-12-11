const isExist = (movie) => {
        
    if(favorite.filter(item => item.id === movie.id).length > 0){
      return true
    }

    return false
  }

  const onTapAddTolist = (movie) => {

    dispatch(addToList(movie));
    //console.log("list favorite",favorite)
  }
  const onTapRemoveTolist = (movie) => {

    dispatch(removeToList(movie));
    //console.log("list favorite",favorite)
  }