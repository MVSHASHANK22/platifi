#include <bits/stdc++.h>

using namespace std;
int ar[8][8];
int ar1[4]={1,0,-1,0};
int ar2[4]={0,1,1,-1}
int solve(int m[][],int m1,int m2,int vis[][])
{
    if(x==n-1 && y==n-1)
    {

        return 1;
    }
    for(int i=0;i<4;i++)
    {
        m1+=ar1[i];
        m2+=ar2[i];
        if(m1<n && m1>0 && m2<n && m2>0)
        {
            if(m[m1][m2]==1)
            {
                solve(m,m1,m2)
            }
        }
    }


}
int main()
{

    cout << "Hello world!" << endl;
    cin>>x;
    cout<<x<<endl;
    return 0;
}
