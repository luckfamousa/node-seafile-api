"use strict";

const rp           = require('request-promise-native');
const request      = require('request');
const util         = require('util');
const path         = require('path');
const querystring  = require('querystring');
const fs           = require('fs-extra');

// fixing Unicode equivalence Issues
// see: https://en.wikipedia.org/wiki/Unicode_equivalence
// see: https://stackoverflow.com/questions/30127280/javascript-encodeuri-vs-php-rawurldecode-and-special-characters
// see: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
querystring.escape = function(str) {
  return encodeURIComponent((""+str).normalize());
};

class Seafile {

  constructor(uri, token) {
    this.appUri = uri;
    this.token = token;
  }
  
  // https://manual.seafile.com/develop/web_api.html#list-accounts
  listAccounts(options) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/accounts/?%s',querystring.stringify(options)),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-account-info
  getAccountInfo(email) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/accounts/%s/',email),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#check-account-info
  checkAccountInfo() {
    return rp({
      method: 'GET', uri: this.appUri+'/api2/account/info/',
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#create-account
  createAccount(email, options) {
    return rp({ 
      method: 'PUT', uri: this.appUri+util.format('/api2/accounts/%s/',email),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#update-account
  updateAccount(email, options) {
    return rp({ 
      method: 'PUT', uri: this.appUri+util.format('/api2/accounts/%s/',email),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#migrate-account
  migrateAccount(email, options) {
    return rp({ 
      method: 'POST', uri: this.appUri+util.format('/api2/accounts/%s/',email),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#delete-account
  deleteAccount(email) {
    return rp({ 
      method: 'DELETE', uri: this.appUri+util.format('/api2/accounts/%s/',email),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-server-information
  getServerInformation() {
    return rp({ 
      method: 'GET', uri: this.appUri+'/api2/server-info',
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#list-starred-files
  listStarredFiles() {
    return rp({ 
      method: 'GET', uri: this.appUri+'/api2/starredfiles/',
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#star-a-file
  starAFile(options) {
    return rp({ 
      method: 'POST', uri: this.appUri+'/api2/starredfiles/',
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#unstar-a-file
  unstarAFile(options) {
    return rp({ 
      method: 'DELETE', uri: this.appUri+'/api2/starredfiles/',
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#list-groups
  listGroups() {
    return rp({ 
      method: 'GET', uri: this.appUri+'/api2/groups/',
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#add-a-group
  addAGroup(options) {
    return rp({ 
      method: 'PUT', uri: this.appUri+'/api2/groups/',
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#delete-group
  deleteGroup(group_id) {
    return rp({ 
      method: 'DELETE', uri: this.appUri+util.format('/api2/groups/%s/',group_id),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#rename-group
  renameGroup(group_id, options) {
    return rp({ 
      method: 'POST', uri: this.appUri+util.format('/api2/groups/%s/',group_id),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#add-a-group-member
  addAGroupMember(group_id, options) {
    return rp({ 
      method: 'PUT', uri: this.appUri+util.format('/api2/groups/%s/members/',group_id),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#delete-a-group-member
  deleteAGroupMember(group_id, options) {
    return rp({ 
      method: 'DELETE', uri: this.appUri+util.format('/api2/groups/%s/members/',group_id),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-group-messages
  getGroupMessages(group_id) {
    return rp({ 
      method: 'GET', uri: this.appUri+util.format('/api2/group/msgs/%s/',group_id),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-group-message-detail
  getGroupMessageDetail(group_id, msg_id) {
    return rp({ 
      method: 'GET', uri: this.appUri+util.format('/api2/group/%s/msg/%s/',group_id,msg_id),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#send-a-group-message
  sendAGroupMessage(group_id, options) {
    return rp({
      method: 'POST', uri: this.appUri+util.format('/api2/group/msgs/%s/',group_id),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#reply-a-group-message
  replyAGroupMessage(group_id, msg_id, options) {
    return rp({
      method: 'POST', uri: this.appUri+util.format('/api2/group/%s/msg/%s',group_id, msg_id),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-group-message-replies
  getGroupMessageReplies() {
    return rp({
      method: 'GET', uri: this.appUri+'/api2/new_replies/',
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#list-file-share-links
  listFileShareLinks() {
    return rp({
      method: 'GET', uri: this.appUri+'/api2/shared-links/',
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#create-file-share-link
  createFileShareLink(repo_id, options) {
    return rp({
      method: 'PUT', uri: this.appUri+util.format('/api2/repos/%s/file/shared-link/',repo_id),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#delete-file-share-link
  deleteFileShareLink(options) {
    return rp({
      method: 'DELETE', uri: this.appUri+util.format('/api2/shared-links/?%s',querystring.stringify(options)),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#send-share-link-email
  sendShareLinkEmail(options) {
    return rp({
      method: 'POST', uri: this.appUri+'/api2/send-share-link/',
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#send-upload-link-email
  sendUploadLinkEmail(options) {
    return rp({
      method: 'POST', uri: this.appUri+'/api2/send-upload-link/',
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#list-direntry-in-dir-download-link
  listDirentryInDirDownloadLink(token, options) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/d/%s/dir/?%s',token,querystring.stringify(options)),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#list-shared-libraries
  listSharedLibraries() {
    return rp({
      method: 'GET', uri: this.appUri+'/api2/shared-repos/',
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#list-be-shared-libraries
  listBeSharedLibraries() {
    return rp({
      method: 'GET', uri: this.appUri+'/api2/beshared-repos/',
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#share-a-library
  shareALibrary(repo_id, options) {
    return rp({
      method: 'PUT', uri: this.appUri+util.format('/api2/shared-repos/%s/?%s',repo_id,querystring.stringify(options)),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#unshare-a-library
  unshareALibrary(repo_id, options) {
    return rp({
      method: 'DELETE', uri: this.appUri+util.format('/api2/shared-repos/%s/?%s',repo_id,querystring.stringify(options)),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-default-library
  getDefaultLibrary() {
    return rp({
      method: 'GET', uri: this.appUri+'/api2/default-repo/',
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#create-default-library
  createDefaultLibrary() {
    return rp({
      method: 'POST', uri: this.appUri+'/api2/default-repo/',
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#list-libraries
  listLibraries() {
    return rp({
      method: 'GET', uri: this.appUri+'/api2/repos/',
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-library-info
  getLibraryInfo(repo_id) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/',repo_id),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-library-owner
  getLibraryOwner(repo_id) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/owner/',repo_id),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-library-history
  getLibraryHistory(repo_id) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/history/',repo_id),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#create-library
  createLibrary(options) {
    return rp({
      method: 'POST', uri: this.appUri+'/api2/repos/',
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#checkcreate-sub-library
  checkCreateSubLibrary(repo_id, options) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/dir/sub_repo/?%s',repo_id,querystring.stringify(options)),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#delete-library
  deleteLibrary(repo_id) {
    return rp({
      method: 'DELETE', uri: this.appUri+util.format('/api2/repos/%s/',repo_id),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#rename-library
  renameLibrary(repo_id, options) {
    return rp({
      method: 'POST', uri: this.appUri+util.format('/api2/repos/%s/?op=rename',repo_id),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#decrypt-library
  decryptLibrary(repo_id, options) {
    return rp({
      method: 'POST', uri: this.appUri+util.format('/api2/repos/%s/',repo_id),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });
  }
  
  // https://manual.seafile.com/develop/web_api.html#create-public-library
  createPublicLibrary(repo_id) {
    return rp({
      method: 'POST', uri: this.appUri+util.format('/api2/repos/%s/public/',repo_id),
      headers: { Authorization: util.format('Token %s',this.token) }
    });
  }
  
  // https://manual.seafile.com/develop/web_api.html#remove-public-library
  removePublicLibrary(repo_id) {
    return rp({
      method: 'DELETE', uri: this.appUri+util.format('/api2/repos/%s/public/',repo_id),
      headers: { Authorization: util.format('Token %s',this.token) }
    });
  }
  
  // https://manual.seafile.com/develop/web_api.html#fetch-library-download-info
  fetchLibraryDownloadInfo(repo_id) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/download-info/',repo_id),
      headers: { Authorization: util.format('Token %s',this.token) }
    });
  }
  
  // https://manual.seafile.com/develop/web_api.html#list-virtual-libraries
  listVirtualLibraries() {
    return rp({
      method: 'GET', uri: this.appUri+'/api2/virtual-repos/',
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#search-libraries
  searchLibraries(options) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/search/?%s',querystring.stringify(options)),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#view-file-through-owa
  viewFileThroughOwa(repo_id, options) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/owa-file/?%s',repo_id,querystring.stringify(options)),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#download-file
  downloadFile(repo_id, options, dest_file) {
  
    fs.ensureFileSync(dest_file);
  
    return new Promise((resolve, reject) => {
      rp({
        method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/file/?%s',repo_id,querystring.stringify(options)),
        headers: { Authorization: util.format('Token %s',this.token) }
      })
        .then(res => {          
          request({
            method: 'GET', uri: res.substr(1,res.length-2),
            headers: { Authorization: util.format('Token %s',this.token) }
          })
            .on('error', (err) => { reject(err) })
            .on('end', () => { resolve(dest_file) })
            .pipe(fs.createWriteStream(dest_file));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  // https://manual.seafile.com/develop/web_api.html#get-file-detail
  getFileDetail(repoId, options) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/file/detail/?%s',repoId,querystring.stringify(options)),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#get-file-history
  getFileHistory(repoId, options) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/file/history/?%s',repoId,querystring.stringify(options)),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#download-file-from-a-revision
  downloadFileFromARevision(repo_id, p, commit_id, dest_file) {
  
    fs.ensureFileSync(dest_file);
  
    return new Promise((resolve, reject) => {
      rp({
        method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/file/revision/?%s',repo_id,querystring.stringify({p:p,commit_id:commit_id})),
        headers: { Authorization: util.format('Token %s',this.token) }
      })
        .then(res => {          
          request({
            method: 'GET', uri: res.substr(1,res.length-2),
            headers: { Authorization: util.format('Token %s',this.token) }
          })
            .on('error', (err) => { reject(err) })
            .on('end', () => { resolve(dest_file) })
            .pipe(fs.createWriteStream(dest_file));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  // https://manual.seafile.com/develop/web_api.html#create-file
  createFile(repoId, p) {
    return rp({
      method: 'POST', uri: this.appUri+util.format('/api2/repos/%s/file/?%s',repoId,querystring.stringify({p:p})),
      form: {operation: 'create'},
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#rename-file
  renameFile(repoId, p, newname) {
    return rp({
      method: 'POST', uri: this.appUri+util.format('/api2/repos/%s/file/?%s',repoId,querystring.stringify({p:p})),
      form: {operation: 'rename', newname: newname},
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#lock-file
  lockFile(repoId, p) {
    return rp({
      method: 'PUT', uri: this.appUri+util.format('/api2/repos/%s/file/',repoId),
      form: {operation: 'lock', p: p},
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#unlock-file
  unlockFile(repoId, p) {
    return rp({
      method: 'PUT', uri: this.appUri+util.format('/api2/repos/%s/file/',repoId),
      form: {operation: 'unlock', p: p},
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#move-file
  moveFile(repoId, p, dst_repo, dst_dir) {
    return rp({
      method: 'POST', uri: this.appUri+util.format('/api2/repos/%s/file/?%s',repoId,querystring.stringify({p:p})),
      form: {operation: 'move', dst_repo: dst_repo, dst_dir: dst_dir},
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#copy-file
  copyFile(repoId, p, dst_repo, dst_dir) {
    return rp({
      method: 'POST', uri: this.appUri+util.format('/api2/repos/%s/file/?%s',repoId,querystring.stringify({p:p})),
      form: {operation: 'copy', dst_repo: dst_repo, dst_dir: dst_dir},
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#revert-file
  revertFile(repoId, p, commit_id) {
    return rp({
      method: 'PUT', uri: this.appUri+util.format('/api2/repos/%s/file/revert/',repoId),
      form: {commit_id: commit_id},
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#delete-file
  deleteFile(repoId, p) {
    return rp({
      method: 'DELETE', uri: this.appUri+util.format('/api2/repos/%s/file/?%s',repoId,querystring.stringify({p:p})),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#get-upload-link
  getUploadLink(repoId, p='/') {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/upload-link/?%s',repoId,querystring.stringify({p:p})),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#upload-file
  uploadFile(repoId, src_file, target_file) {
    return new Promise((resolve, reject) => {
      this.getUploadLink(repoId, path.dirname(target_file))
        .then(res => { 
          rp({
            method: 'POST', uri: res.substr(1,res.length-2),
            formData: {
              file: fs.createReadStream(src_file),
              filename: path.basename(target_file),
              parent_dir: path.dirname(target_file)
            },
            headers: { Authorization: util.format('Token %s',this.token) }
          })
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-update-link
  getUpdateLink(repoId, p='/') {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/update-link/?%s',repoId,querystring.stringify({p:p})),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#update-file
  updateFile(repoId, src_file, target_file) {
    return new Promise((resolve, reject) => {
      this.getUpdateLink(repoId, path.dirname(target_file))
        .then(res => { 
          return rp({
            method: 'POST', uri: res.substr(1,res.length-2),
            formData: {
              file: fs.createReadStream(src_file),
              filename: path.basename(target_file),
              target_file: target_file
            },
            headers: { Authorization: util.format('Token %s',this.token) }
          });
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  uploadOverwriteFile(repoId, src_file, target_file) {
    return new Promise((resolve, reject) => {
      this.updateFile(repoId, src_file, target_file)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          this.uploadFile(repoId, src_file, target_file)
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            })
        })
    });
  }

  // https://manual.seafile.com/develop/web_api.html#get-upload-blocks-link
  getUploadBlocksLink(repoId) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/upload-blks-link/',repoId),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#get-upload-blocks-link
  getUpdateBlocksLink(repoId) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/update-blks-link/',repoId),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }

  // https://manual.seafile.com/develop/web_api.html#list-directory-entries
  listDirectoryEntries(repoId, options) {
    return rp({
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/dir/?%s',repoId,querystring.stringify(options)),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#create-new-directory
  createNewDirectory(repoId, p) {
    return rp({
      method: 'POST', uri: this.appUri+util.format('/api2/repos/%s/dir/?%s',repoId,querystring.stringify({p:p})),
      form: {operation: 'mkdir'},
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#rename-directory
  renameDirectory(repoId, p, newname) {
    return rp({
      method: 'POST', uri: this.appUri+util.format('/api2/repos/%s/dir/?%s',repoId,querystring.stringify({p:p})),
      form: {operation: 'rename', newname: newname},
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#delete-directory
  deleteDirectory(repoId, p) {
    return rp({
      method: 'DELETE', uri: this.appUri+util.format('/api2/repos/%s/dir/?%s',repoId,querystring.stringify({p:p})),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#download-directory
  downloadDirectory(repoId, p, destFile) {
  
    fs.ensureFileSync(destFile);
  
    return new Promise((resolve, reject) => {
      rp({
        method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/dir/download/?%s',repoId,querystring.stringify({p:p})),
        headers: { Authorization: util.format('Token %s',this.token) }
      })
        .then(res => {          
          request({
            method: 'GET', uri: res.substr(1,res.length-2),
            headers: { Authorization: util.format('Token %s',this.token) }
          })
            .on('error', (err) => { reject(err) })
            .on('end', () => { resolve(destFile) })
            .pipe(fs.createWriteStream(destFile));
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  
  // https://manual.seafile.com/develop/web_api.html#share-directory
  shareDirectory(repoId, p, options) {
    return rp({
      method: 'PUT', uri: this.appUri+util.format('/api2/repos/%s/dir/shared_items/?%s',repoId,querystring.stringify({p:p})),
      form: options,
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#copy
  copyMultiple(repoId, p, fileNames, dstRepo, dstDir) {
    return rp({  
      method: 'POST', uri: this.appUri+util.format('/api2/repos/%s/fileops/copy/?%s',repoId,querystring.stringify({p:p})),
      form: {dst_repo: dstRepo, dst_dir: dstDir, file_names: ([].concat(fileNames)).join(':')},  
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#move
  moveMultiple(repoId, p, fileNames, dstRepo, dstDir) {
    return rp({  
      method: 'POST', uri: this.appUri+util.format('/api2/repos/%s/fileops/move/?%s',repoId,querystring.stringify({p:p})),
      form: {dst_repo: dstRepo, dst_dir: dstDir, file_names: ([].concat(fileNames)).join(':')},  
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#delete
  deleteMultiple(repoId, p, fileNames) {
    return rp({  
      method: 'POST', uri: this.appUri+util.format('/api2/repos/%s/fileops/delete/?%s',repoId,querystring.stringify({p:p})),
      form: {file_names: ([].concat(fileNames)).join(':')},  
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-user-avatar
  getUserAvatar(user, size) {
    return rp({  
      method: 'GET', uri: this.appUri+util.format('/api2/avatars/user/%s/resized/%s/',user, size),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-group-avatar
  getGroupAvatar(groupId, size) {
    return rp({  
      method: 'GET', uri: this.appUri+util.format('/api2/avatars/group/%s/resized/%s/',groupId, size),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-group-avatar
  getFileActivities(start=0) {
    return rp({  
      method: 'GET', uri: this.appUri+util.format('/api2/events/?%s',querystring.stringify({start:start})),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#get-thumbnail-image
  getThumbnailImage(repoId, p, size) {
    return rp({  
      method: 'GET', uri: this.appUri+util.format('/api2/repos/%s/thumbnail/?%s',repoId, querystring.stringify({p:p, size:size})),
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
  
  // https://manual.seafile.com/develop/web_api.html#add-organization
  addOrganization(username, password, org_name, prefix, quota, member_limit) {
    return rp({  
      method: 'GET', uri: this.appUri+'/api2/organization/',
      form: {
        username: username,
        password: password,
        org_name: org_name,
        prefix: prefix,
        quota: quota,
        member_limit: member_limit
      },
      headers: { Authorization: util.format('Token %s',this.token) }
    });  
  }
}

module.exports = Seafile;
