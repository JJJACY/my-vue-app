import axios from '../request/axios'
const API = '../public/tw.json'

const localTwJsonService = {
  Json(){
    return axios.get(API)
  }
}

export default localTwJsonService