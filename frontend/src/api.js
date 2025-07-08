import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

class LeagueOneApi {
  static token;

  // Modified request method to include the token in headers
  static async request(endpoint, data = {}, method = 'get') {
    console.log(`API Request: ${method.toUpperCase()} ${endpoint}`);
    console.log(`API Request Data: `, data);
    const url = `${BASE_URL}/${endpoint}`;
    
    // Added Authorization header with Bearer token
    const headers = {
      Authorization: `Bearer ${LeagueOneApi.token}`,
    };
    const params = (method === 'get') ? data : {};

    try {
      const res = await axios({ url, method, data, params, headers });
      return res.data;
    } catch (error) {
      console.error('API Error:', error.response);
      throw error.response.data;
    }
  }

  // Auth Routes
  static async registerUser(data) {
    let res = await this.request('auth/register', data, 'post');
    return res;
  }

  static async getCurrentUser(username) {
    try {
      let res = await this.request(`users/${username}`);
      console.log('api.js static route called for user:', username)
      console.log("user data:", res.data)
      return res; // Assuming response structure has the user object directly
    } catch (error) {
      console.error('getCurrentUser failed:', error);
      throw error;
    }
  }
  
  
  static async loginUser(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }


  // League Routes
  static async getLeagues(filters) {
    let res = await this.request('leagues', { params: filters });
    return res;
  }

  static async getStandingsByLeagueId(id){
    let res = await this.request(`leagues/${id}/standings`)
    return res;
  }
  
  static async getLeagueById(id) {
    let res = await this.request(`leagues/${id}`);
    return res;
  }

  static async createLeague(data) {
    let res = await this.request('leagues/create', data, 'post');
    return res;
  }

  static async joinLeague(leagueId, data) {
    let res = await this.request(`leagues/${leagueId}/join`, data, 'post');
    return res;
  }

  static async updateLeague(id, data) {
    let res = await this.request(`leagues/${id}`, data, 'put');
    return res;
  }

  static async deleteLeague(id) {
    let res = await this.request(`leagues/${id}`, {}, 'delete');
    return res;
  }

  static async leaveLeague(id, data) {
    let res = await this.request(`leagues/${id}/leave`, data, 'post');
    return res;
  }

  static async removeTeamFromLeague(leagueId, teamLeaguesId) {
    let res = await this.request(`leagues/${leagueId}/remove/${teamLeaguesId}`, {}, 'delete');
    return res;
}



  // Match Routes
  static async getMatches(leagueId, filters = {}) {
    let res = await this.request(`leagues/${leagueId}/matches`, { params: filters });
    return res;
  }

  static async getMatch(leagueId, matchId) {
    let res = await this.request(`leagues/${leagueId}/matches/${matchId}`);
    return res;
}

  static async createMatch(leagueId, data) {
    let res = await this.request(`leagues/${leagueId}/matches/create`, data, 'post');
    return res;
}

  static async updateMatch(leagueId, matchId, data) {
    let res = await this.request(`leagues/${leagueId}/matches/${matchId}`, data, 'put');
    return res;
  }

  static async deleteMatch(leagueId, matchId) {
    let res = await this.request(`leagues/${leagueId}/matches/${matchId}`, {}, 'delete');
    return res;
  }

  // Team Routes
  static async getTeams(filters) {
    let res = await this.request('teams', { params: filters });
    return res;
  }

  static async getTeamsForAdmin(userId) {
    try {
      let res = await this.request(`teams/admin/${userId}`);
      return res;
    } catch (error) {
      console.error('Error retrieving teams for admin:', error);
      throw error;
    }
  }

  static async getTeamById(id) {
    let res = await this.request(`teams/${id}`);
    return res;
  }

  static async createTeam(data) {
    console.log("Making API call to teams/create", data);
    let res = await this.request('teams/create', data, 'post');
    return res;
  }

  static async joinTeam(teamId, data) {
    let res = await this.request(`teams/${teamId}/join`, data, 'post');
    return res;
  }

  static async leaveTeam(teamId) {
    let res = await this.request(`teams/${teamId}/leave`, {} , "post");
    return res.data; 
  }

  static async removePlayerFromTeam(teamId, playerId) {
    let res = await this.request(`teams/${teamId}/players/${playerId}`, {}, 'delete')
  }

  static async updateTeam(id, data) {
    let res = await this.request(`teams/${id}`, data, 'put');
    return res;
  }

  static async deleteTeam(id) {
    let res = await this.request(`teams/${id}`, {}, 'delete');
    return res;
  }

  // User Routes
  static async getUsers(filters) {
    let res = await this.request('users', { params: filters });
    return res;
  }

  static async getUserByUsername(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  static async createUser(data) {
    let res = await this.request('users/create', data, 'post');
    return res;
  }

  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, 'put');
    return res;
  }

  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, 'delete');
    return res;
  }
}

export default LeagueOneApi;
