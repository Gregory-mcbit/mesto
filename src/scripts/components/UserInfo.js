export default class UserInfo {
    constructor({name: profileNameSelector, profession: profileProfessionSelector}) {
      this._userName = document.querySelector(profileNameSelector);
      this._userProfession = document.querySelector(profileProfessionSelector)
    }
  
    getUserInfo() {
      const userData = {
        name: this._userName.textContent,
        profession: this._userProfession.textContent
      }
      
      return userData;
    }
  
    setUserInfo({name, profession}) {
      if(name) {
        this._userName.textContent = name
      }

      if(profession) {
        this._userProfession.textContent = profession
      }
    }
  }