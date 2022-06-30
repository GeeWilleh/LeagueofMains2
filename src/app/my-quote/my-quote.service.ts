import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChampsService {
  animations: boolean = true;
  name = '';
  champions = [];
  selectedChampion = {};
  favoriteChampions = [];
  championDetails;
  dataDragonVersion: string = '12.10.1';
  region: string = 'NA1';
  massRegion: string = 'AMERICAS';
  apiKeyRoot = 'api_key=RGAPI-eb09d62e-65bc-4814-8ee8-435fe5086e5a';

  regions = [
    { value: 'NA1', viewValue: 'NA' },
    { value: 'KR', viewValue: 'KR' },
    { value: 'JP1', viewValue: 'JP' },
    { value: 'EUN1', viewValue: 'EUNE' },
    { value: 'EUW1', viewValue: 'EUW' },
    { value: 'BR1', viewValue: 'BR' },
    { value: 'LA1', viewValue: 'LA1' },
    { value: 'LA2', viewValue: 'LA2' },
    { value: 'OC1', viewValue: 'OC' },
    { value: 'RU', viewValue: 'RU' },
    { value: 'TR1', viewValue: 'TR' },
  ];

  constructor(private http: HttpClient) {}

  getDDVersion() {
    return this.http.get<any>(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    );
  }

  getAllChampions(DDversion) {
    return this.http.get<any>(
      'https://ddragon.leagueoflegends.com/cdn/' +
        DDversion +
        '/data/en_US/champion.json'
    );
  }

  getChampionData(championDetails, DDversion) {
    let apiRoot =
      'https://ddragon.leagueoflegends.com/cdn/' +
      DDversion +
      '/data/en_US/champion/';
    let search = championDetails;
    let tail = '.json';
    let apiUrl = `${apiRoot}${search}${tail}`;
    return this.http.get<any>(apiUrl);
  }

  getSummonerByName(region, input) {
    let apiRoot =
      'https://' +
      region +
      '.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
    let name = input.replaceAll(' ', '%20');
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${name}${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  getMatchesByPUUID(region, input) {
    let apiRoot =
      'https://' + region + '.api.riotgames.com/lol/match/v5/matches/by-puuid/';
    let apiKey = `${this.apiKeyRoot}`;
    let apiEnd = '/ids?start=0&count=16';
    let apiUrl = `${apiRoot}${input}${apiEnd}&${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  getChampsByMatch(region, input) {
    let apiRoot =
      'https://' + region + '.api.riotgames.com/lol/match/v5/matches/';
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${input}${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  getPlayerStatsWithSummonerID(region, ID) {
    let apiRoot =
      'https://' +
      region +
      '.api.riotgames.com/lol/league/v4/entries/by-summoner/';
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${ID}${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  getSummonerWithSummonerID(region, ID) {
    let apiRoot =
      'https://' + region + '.api.riotgames.com/lol/summoner/v4/summoners/';
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${ID}${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  getTopTenPlayersInRegion(selectedRegion) {
    let apiRoot =
      'https://' +
      selectedRegion +
      '.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?';
    let apiKey = `${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  regionCheckAndChange(region) {
    this.name = '';
    if (
      region === 'BR1' ||
      region === 'LA1' ||
      region === 'LA2' ||
      region === 'NA1' ||
      region === 'OC1'
    ) {
      this.region = `${region}`;
      this.massRegion = 'AMERICAS';
    } else if (region === 'KR' || region === 'JP1') {
      this.region = `${region}`;
      this.massRegion = 'ASIA';
    } else if (
      region === 'EUN1' ||
      region === 'EUW1' ||
      region === 'RU' ||
      region === 'TR1'
    ) {
      this.region = `${region}`;
      this.massRegion = 'EUROPE';
    }
  }

  getMostPlayedChampions(region, summonerId) {
    let apiRoot =
      'https://' +
      region +
      '.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/';
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${summonerId}${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  getChampionNameWithID(id: number) {
    return this.http.get<any>(
      'https://ddragon.leagueoflegends.com/cdn/' +
        this.dataDragonVersion +
        '/data/en_US/champion.json'
    );
  }

  checkIfPlayerIsInGame(region, summonerId) {
    let apiRoot =
      'https://' +
      region +
      '.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/';
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${summonerId}${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  returnItems() {
    return this.http.get<any>(
      'https://ddragon.leagueoflegends.com/cdn/' +
        this.dataDragonVersion +
        '/data/en_US/item.json'
    );
  }

  returnRunes() {
    return this.http.get<any>(
      'https://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/runesReforged.json'
    );
  }
}
