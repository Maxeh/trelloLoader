declare var Trello: any;

export class TrelloService {

  constructor(){ }

  trelloAuthorize(): void{
    Trello.authorize({
      type: 'redirect',
      name: 'trelloLoader',
      scope: {
        read: 'true',
        write: 'true' },
      expiration: 'never',
      success: () => {
        console.log("Authorization successful");
        window.location.href = "/";
      },
      error: () => {
        console.log("Authorization failed.");
        window.location.href = "/";
      }
    });
  }
}
