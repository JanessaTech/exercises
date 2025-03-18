###

when have 2 slots: children and modal.
The 2 slots are shown simultanously when we visit http://localhost:3000/photo-feed/

The children slot shows the list of pictures
The modal slot shows a simple string saying 'default value for modal' for the purpose where it is

when we cilck one of pictures, saying picture 1, the url is updated to http://localhost:3000/photo-feed/1
the the slot modal should do the same reaction to the ulr above.
In the modal, (..)photo-feed/[id] intercepets http://localhost:3000/photo-feed/1,
