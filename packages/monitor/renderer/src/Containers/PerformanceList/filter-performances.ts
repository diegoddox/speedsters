export default (performances: any[], searchText: string, isQuickSearchOpen: boolean): any[] => {
  /**
   * Just return the performances
   * if @isQuickSearchOpen is false.
   */
  if (!isQuickSearchOpen) {
    return performances;
  }

  const searchTextIsNumber = !isNaN(searchText as any);

  return performances.map(performance => ({
    ...performance,
    data: performance.data.filter((item: any) => {

      if (item.hasOwnProperty('milliseconds') && searchTextIsNumber) {
        const matchMilliseconds = item.milliseconds.toString().indexOf(searchText) !== -1;
        if (matchMilliseconds) {
          return matchMilliseconds;
        }
      } 

      const matchTitle = item.name.toLocaleLowerCase().indexOf(searchText) !== -1;

      if (matchTitle) {
        return matchTitle;
      }
      
      if (item.data && Array.isArray(item.data)) {
        return item.data.filter((x: any) => {
          if (searchTextIsNumber && x.hasOwnProperty('milliseconds')) {
            return x.milliseconds.toString().indexOf(searchText) !== -1
          } else {
            return x.name.toLocaleLowerCase().indexOf(searchText) !== -1
          }
        }).length;
      } 
    }),
  }));
};