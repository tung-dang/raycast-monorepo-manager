import { Action, Icon } from '@raycast/api';
import { Workspace } from '@yarnpkg/core';
import type { WorkspaceManager } from '../packages/workspace-manager';
import * as cached from '../utils/cache';
import { ActionOpenProjectLink } from '../views/ActionOpenProjectLink';
import { ActionOpenSlackLink } from '../views/ActionOpenSlackLink';
import { iconSublimeText, iconVSCode } from './icons';

export function getCommonActions(path: string) {
  return [
    <Action.ShowInFinder
      key="open-in-finder"
      title="Open in Finder"
      path={path}
      shortcut={{ modifiers: ['cmd'], key: 'o' }}
    />,
    <Action.CopyToClipboard
      key="copy-path"
      title="Copy Path"
      content={path}
      icon={Icon.CopyClipboard}
      shortcut={{ modifiers: ['cmd'], key: 'c' }}
    />,
    <Action.Open
      application="com.apple.Terminal"
      key="open-in-terminal"
      title="Open in Terminal"
      target={path}
      icon={Icon.Terminal}
      shortcut={{ modifiers: ['cmd'], key: 't' }}
    />,
    <Action.OpenWith
      key="open-with"
      title="Open With..."
      path={path}
      icon={Icon.AppWindow}
      shortcut={{ modifiers: ['cmd'], key: 'o' }}
    />,
  ];
}

export function getRareActions(path: string) {
  return [
    <Action.Trash
      key="trash"
      title="Move to Trash"
      paths={path}
      icon={Icon.Trash}
      shortcut={{ modifiers: ['ctrl'], key: 'delete' }}
    />,
    <Action
      key="clear-cache"
      title="Clear Cache"
      onAction={cached.clear}
      icon={Icon.Circle}
      shortcut={{ modifiers: ['ctrl'], key: 'x' }}
    />,
  ];
}

export function getOpenInEditorActions(path: string) {
  return [
    <Action.Open
      application="Visual Studio Code"
      key="open-in-vs-code"
      title="Open in Visual Studio Code"
      target={path}
      icon={iconVSCode}
      // Note: Open in VSCode is always a 2nd position in list of actions.
      shortcut={{ modifiers: ['cmd'], key: 'enter' }}
    />,
    <Action.Open
      application="Sublime Text"
      key="open-in-sublime-text"
      title="Open in Sublime Text"
      target={path}
      icon={iconSublimeText}
      shortcut={{ modifiers: ['cmd'], key: 's' }}
    />,
  ];
}

export function getActionsForPackageWithTeam(
  teamName: string,
  ws: Workspace,
  wsManagerInstance: WorkspaceManager | null
) {
  return [
    <ActionOpenSlackLink teamName={teamName} workspace={ws} workspaceRootInstance={wsManagerInstance} />,
    <ActionOpenProjectLink teamName={teamName} workspace={ws} workspaceRootInstance={wsManagerInstance} />,
  ];
}
