import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpHeaders } from '@angular/common/http';
import { ApolloLink, concat } from 'apollo-link';
import { environment } from '../environments/environment';

const uri = 'https://api.github.com/graphql';
export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({ uri });
  return {
    link: concat(authMiddleware, http),
    cache: new InMemoryCache(),
  };
}

function getToken() {
  return environment.git;
}

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: new HttpHeaders().set('Authorization', 'Bearer ' + getToken()),
  });

  return forward(operation);
});

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
