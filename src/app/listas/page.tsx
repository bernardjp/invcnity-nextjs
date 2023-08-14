import React from 'react';
import ListHandler from '../components/ListsHandler';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IN/VCNITY Lists',
  description: 'Dashboard that showcase all your Estates stored in IN/VCNITY.',
};

function ListPage(): React.ReactElement {
  /*
    1-  This page show an action prompt to login/signup if the user isn't authenticated.
    2-  If the user is authenticated then this page shows the list of real estates (RE) that the user is authorized to see/interact.
      2.1- This also shows a link to the list-creator-page with the form enough to create a list from scratch.

    LIST (properties):
      - uid --> created by Firebase
      - name --> string
      - created_by --> user.uid --> note: (optional) this set the role of this user to "owner"
      (optional):
      - roles --> { user_id_01: "owner", user_id_02: "editor", user_id_03: "reader" }

      Subcollection: (?) 
      Option 01.a:
        - estates_list --> [estate_1.uid, estate_2.iud, ...]

      Option 01.b: Subcollection of Estate_lists
        - estates_list --> [{ id: estate_1.uid, name }, { id: estate_2.uid, name }, ...]
      
      Option 02:
        Create "EstateSnippets" with basic info.
        This approach cuts down the amount of queries to DB, but must be updated everytime a new Estate is added.
        The info stored here can be used to filter searches (e.g. price, location, favourites).
        - estates_list --> [
          { // this is a EstateSnippet example
            estate_id,
            favourite,
            url,
            locationURL,
            location,
            name,
            price
          }, 
          EstateSnippet_02,
          ...
        ]
  */

  return (
    <main>
      <ListHandler />
    </main>
  );
}
export default ListPage;
