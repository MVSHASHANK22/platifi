#include<bits/stdc++.h>
using namespace std;
vector <int> v1;
backtrack(int ar[],int a,int b,int si,int m)
{
	if(a<m && a+b>=m)
	{
		v1.push_back(val);
		val++; 
		backtrack(ar,a+ar[val],b-ar[val]);

	}
	else if(a>m)
	{

		
	}

}
int main()
{
	cout<<"hello world";
}