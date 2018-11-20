import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel,faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faKey,faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faKey,faUser,faSignOutAlt);
library.add(faStroopwafel);
const App = ({ children }) => (
  <div>
    <main>
      {children}
    </main>
  </div>
);

export default App;
