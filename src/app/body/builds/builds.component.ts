import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators/';
import { CallServiceService } from '../../services/call-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss'],
})
export class BuildsComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    public call: CallServiceService,
    public router: Router
  ) {}

  gitInfo = [];

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
                isFork: false
              ) {
                nodes {
                  createdAt
                  name
                  description
                  url
                  primaryLanguage {
                    name
                  }
                  languages(first: 100) {
                    totalSize
                    edges {
                      size
                      node {
                        name
                        color
                      }
                    }
                  }
                  collaborators {
                    nodes {
                      name
                      avatarUrl
                      url
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
            primaryLanguage:
              'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/' +
              this.getLan(node.primaryLanguage.name.toLowerCase()) +
              '.svg',
            languages: [],
            url: node.url,
          };
          node.collaborators.nodes.forEach((col) => {
            temp.collaborators.push({
              name: col.name,
              pic: col.avatarUrl,
              account: col.url,
            });
          });

          let totalSize: number = parseInt(node.languages.totalSize);

          node.languages.edges.forEach((lan) => {
            let size: any = parseInt(lan.size);
            size = ((size / totalSize) * 100).toFixed(1);
            temp.languages.push({
              size,
              name: lan.node.name,
              color: lan.node.color,
              url:
                'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/' +
                this.getLan(lan.node.name.toLowerCase()) +
                '.svg',
            });
          });
          this.gitInfo.push(temp);
        });
      });
    console.log(this.gitInfo);
  }

  go(url) {
    window.open(url);
  }

  getLan(name) {
    switch (name) {
      case 'batchfile':
        return 'console';
      case 'objective-c':
        return 'h';
      case 'jupyter notebook':
        return'jupyter';
      default:
        return name;
    }
  }
}
