import { TestBed, inject} from '@angular/core/testing';

import { User } from '../app/entities/user';
import { AuthUser } from '../app/entities/auth-user';

import { Http, Response, ResponseOptions } from '@angular/http';

import {AuthService} from '../app/services/auth-service';
import { StorageService } from "../app/services/storage-service";

import { FakeHttp } from './fake/fake-http';
import { FakeStorageService } from './fake/fake-storage-service';
import { LoadBlockService } from '../app/services/load-block';

// let corsesDb = require '../../mock-server/services/core/courses/courses.db.json';

describe('auth-service', () => {
  let http = new FakeHttp();
  let loadBlockService: LoadBlockService;
  let storageService = new FakeStorageService();
  let authService: AuthService;
  let user = new User("name", "pass")
  let userBody =  {
    name: "name",
    password: "pass",
    token: "aasdf"
  };

  beforeEach(()=>{

    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        LoadBlockService,
        { provide: Http, useValue: http },
        { provide: StorageService, useValue: storageService },
      ]
    });

    loadBlockService = TestBed.get( LoadBlockService );
    authService = new AuthService(http as any, loadBlockService, storageService as any)

  })

  it('should auth user', (done) => {
    let options = new ResponseOptions({body:userBody,status: 200} )
    http.setPostResonse(authService.authUrl, new Response(options));
    authService.auth.subscribe((authUser:AuthUser)=>{
      expect(authUser).toEqual(new AuthUser(user))
      expect(authService.isLoggedIn()).toBeTruthy();
      done();
    });
    authService.login(user);
  });

  it('should set auth token', (done) => {
    let options = new ResponseOptions({body:userBody,status: 200} )
    http.setPostResonse(authService.authUrl, new Response(options));
    authService.auth.subscribe((authUser:AuthUser)=>{
      expect(authService.getToken()).toEqual(userBody.token);
      done();
    });
    authService.login(user);
  });

  it('logout should reset user', (done) => {
    let options = new ResponseOptions({body:userBody,status: 200} )
    http.setPostResonse(authService.authUrl, new Response(options));
    authService.auth.skip(1).subscribe((authUser:AuthUser)=>{
      expect(authUser).toEqual(new AuthUser(null))
      expect(authService.isLoggedIn()).toBeFalsy();
      done();
    });
    authService.login(user);
    authService.logout();
  });


});
