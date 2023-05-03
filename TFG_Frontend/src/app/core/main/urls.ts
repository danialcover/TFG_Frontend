export class Urls {
  private static readonly baseURL: string = 'http://127.0.0.1:8000';
  private static readonly baseApiURL: string = this.baseURL + '/api';

  public static getEndpointURL(endpoint: string): string {
    return this.baseApiURL + '/' + endpoint;
  }

  public static getLoginURL(): string {
    return this.baseURL + '/' + 'login/';
  }

  public static getRolesURL(): string {
    return this.baseApiURL + '/' + 'roles';
  }

  public static getLeaguesURL(): string {
    return this.baseApiURL + '/' + 'leagues/';
  }

  public static getGroupsURL(): string {
    return this.baseApiURL + '/' + 'groups/';
  }

  public static getClubsURL(): string {
    return this.baseApiURL + '/' + 'clubs/';
  }

  public static getTeamsURL(): string {
    return this.baseApiURL + '/' + 'teams/';
  }

  public static getLocationsURL(): string {
    return this.baseApiURL + '/' + 'locations/';
  }

  public static getMembersURL(): string {
    return this.baseApiURL + '/' + 'members/';
  }

  public static getMatchesURL(): string {
    return this.baseApiURL + '/' + 'matches/';
  }

  public static getRefereesURL(): string {
    return this.baseURL + '/' + 'profiles/referees/';
  }

  public static getProfilesCreateURL(): string {
    return this.baseURL + '/' + 'profiles/create/';
  }

  public static getProfilesDeleteURL(id: number): string {
    return this.baseURL + '/' + 'profiles/delete/' + id + '/';
  }

}
