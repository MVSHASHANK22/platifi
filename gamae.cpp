#include<bits/stdc++.h>
using namespace std;
class node
{
	int dat;
	node *right;
	node *left;
	node(int x)
	{
		this->dat=x;
		right=NULL;
		left=NULL;
	}
};
stack <int> s1;
int s;
void treedfs(node * root)
{
	if(root!=NULL)
	{
	if(root->left!=NULL)
	{
		treedef(root->left);
	}
	s++;
	if(root->right!=NULL)
	{
		treedef(root->right);
	}
}
}
int main()
{
	 node *root = new node(1);  
    root->left = new node(2);  
    root->right = new node(3);  
    root->left->left = new node(4);  
    root->left->right = new node(5);
    treedfs(root);
    cout<<s<<endl;
}