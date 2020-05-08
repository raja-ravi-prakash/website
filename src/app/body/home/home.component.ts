import { Component, OnInit } from '@angular/core';
import { CallServiceService } from '../../services/call-service.service';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  options = {
    path: '/assets/hi.json',
  };

  hi = {
    path: '/assets/home-playing.json',
  };

  gitInfo = [];

  constructor(
    public call: CallServiceService,
    public router: Router,
    private apollo: Apollo
  ) {}

  go(url) {
    window.open(url);
  }

  fly() {
    this.call.send('about');
    this.router.navigate(['about']);
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            viewer {
              repositories(
                first: 100
                privacy: PUBLIC
                orderBy: { field: CREATED_AT, direction: DESC }
              ) {
                nodes {
                  createdAt
                  name
                  description
                  url
                  primaryLanguage {
                    name
                  }
                  collaborators {
                    totalCount
                    nodes {
                      name
                      avatarUrl
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .valueChanges.pipe(
        map((value: any) => {
          return value.data.viewer.repositories.nodes;
        })
      )
      .subscribe((val: Array<Object>) => {
        val.forEach((node: any) => {
          let temp = {
            time: node.createdAt,
            name: node.name.split('-').join(' '),
            description: node.description,
            collaborators: [],
            language:
              'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/' +
              node.primaryLanguage.name.toLowerCase() +
              '.svg',
            url: node.url,
          };
          node.collaborators.nodes.forEach((col) => {
            temp.collaborators.push({ name: col.name, pic: col.avatarUrl });
          });

          this.gitInfo.push(temp);
        });
      });
  }
}
