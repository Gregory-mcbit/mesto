export default class UserInfo {
    constructor({profileNameSelector, profileProfessionSelector, profileUserAvatarSelector}) {
      this._userName = document.querySelector(profileNameSelector);
      this._userProfession = document.querySelector(profileProfessionSelector);
      this._userAvatarElement = document.querySelector(profileUserAvatarSelector);
      this._userAvatar = this._userAvatarElement;
    }
  
    getUserInfo() {
      const userData = {
        name: this._userName.textContent,
        profession: this._userProfession.textContent,
        avatar: this._userAvatar
      }
      
      return userData;
    }

    setUserAvatar(avatar) {
      if(avatar) {
        this._avatar = avatar
        this._userAvatar.src = avatar;
      }
    }
  
    setUserInfo({name, profession}) {
      if(name) {
        this._name = name
        this._userName.textContent = name;
      }
      if(profession) {
        this._profession = profession
        this._userProfession.textContent = profession;
      }
    }
  }