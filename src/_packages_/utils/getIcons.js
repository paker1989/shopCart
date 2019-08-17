import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel, 
         faTimesCircle,
         faSearch } from '@fortawesome/free-solid-svg-icons';

console.log(faSearch);

library.add(faStroopwafel);
library.add(faTimesCircle);
library.add(faSearch);

export default library;