namespace pathing {

    export enum DistanceMetric {
        Manhattan = 1,
        Diagonal = 2,
        EuclideanSquared = 4,
        Euclidean = 8
    }

    export enum PathStepResult {
        NoGoal, GoalUnreachable, Continue, GoalFound
    }

    export enum PathFlags {
        VisualizePathfinding
    }





    type PathNode = [number, tiles.Location, CollisionDirection];
    type PathNodeWithIdx = [number, tiles.Location, CollisionDirection, number];
    // g, h, parent
    type AStarBufferCell = [number, number, tiles.Location];

    export type AStarState = {
        pathBuffer: AStarBufferCell[][];
        nodesToVisit: PathNode[];
        metric: DistanceMetric;
        start: tiles.Location;
        goal: tiles.Location;
    }

    export type AStartPathStep = {
        result: PathStepResult;
        nodeVisited: PathNode;
        newNodeCandidates: PathNode[];
    }

    function distance(from: tiles.Location, to: tiles.Location, metric: DistanceMetric) {
        const dx = Math.abs(to.col - from.col);
        const dy = Math.abs(to.row - from.row);

        let dist = 0;

        dist += metric & DistanceMetric.Manhattan ? dx + dy : 0;
        dist += metric & DistanceMetric.Diagonal ? Math.max(dx, dy) : 0;
        dist += metric & DistanceMetric.EuclideanSquared ? (dx*dx + dy*dy) : 0;
        dist += metric & DistanceMetric.Euclidean ? Math.sqrt(dx*dx + dy*dy) : 0;

        return dist;
    }

    export function initialize_AStar(start: tiles.Location, goal: tiles.Location, metric: DistanceMetric): AStarState {

        const pathBuffer: AStarBufferCell[][] = [];
        const tmData = game.currentScene().tileMap.data;
        for (let r = 0; r < tmData.height; r++) {
            pathBuffer[r] = [];
            for (let c = 0; c < tmData.width; c++) {
                // cost to get here, estimated cost to goal, parent
                pathBuffer[r][c] = [Infinity, Infinity, null];
            }
        }

        const dist = distance(start, goal, metric);
        pathBuffer[start.row][start.col] = [0, dist, null];
        const nodesToVisit: PathNode[] = [[dist, start, 0]];
        
        return {
            pathBuffer,
            nodesToVisit,
            metric,
            start,
            goal
        };
    }

    export function AStar_pathStep(state: AStarState): AStartPathStep {
        const { pathBuffer, nodesToVisit, metric, goal } = state;

        function emptyResult(res: PathStepResult): AStartPathStep {
            return { result: res, nodeVisited: null, newNodeCandidates: [] };
        }

        if (nodesToVisit.length === 0) return emptyResult(PathStepResult.GoalUnreachable);

        let [f, cur, dir, i] = nodesToVisit.reduce((prev, cur, i) => { 
            const [pf] = prev;
            let [f, loc, dir] = cur;
            //f += i * i;
            return f < pf ? <PathNodeWithIdx>[f, loc, dir, i] : prev;

        }, <PathNodeWithIdx>[Infinity, null, null, -1]);

        nodesToVisit.removeAt(i);


        if (cur.row == goal.row && cur.col == goal.col) {
            return {
                result: PathStepResult.GoalFound,
                nodeVisited: [f, cur, dir],
                newNodeCandidates: []
            };
        }
        //tiles.setTileAt(cur, myTiles.tile1);
        
        let [g] = pathBuffer[cur.row][cur.col];
        let walls = 0;
        let newFringe: PathNode[] = [];
        for (let dir = 0; dir < 4; ++dir) {
            const n = cur.getNeighboringLocation(dir);
            let [ng] = pathBuffer[n.row][n.col];
            const wasVisited = ng != Infinity;
            if (wasVisited) continue;
            if (n.isWall()) {
                walls++;
                continue;
            } 
            const ndist = distance(n, goal, metric);
            newFringe.push([ndist, n, (dir+2)%4]);
        }

        for (let x of newFringe) {
            let [h, n, dir] = x;
            // wall buff, does increase likehood of following walls, but doesn't seem super useful
            //h *= 1 - walls / 4;
            // const nextIsWallDebuff = n.getNeighboringLocation(dir).isWall() ? 1.2 : 1;
            // h *= nextIsWallDebuff;
            h *= 1.1;
            pathBuffer[n.row][n.col] = [g+1, h, cur];
            nodesToVisit.unshift([g + 1 + h, n, dir]);

            // let text = textsprite.create(`${Math.round((g+1 + h)*10)}`);
            // tiles.placeOnTile(text, n);
        }

        return {
            result: PathStepResult.Continue,
            nodeVisited: [f, cur, dir],
            newNodeCandidates: newFringe
        };
    }

    export function AStar_tracePath(state: AStarState): tiles.Location[] {
        const { pathBuffer, nodesToVisit, metric, start, goal } = state;

        let cur = goal;
        const path = [];
        while (cur.col != start.col || cur.row != start.row) {
            path.unshift(cur);
            const [g, h, p] = pathBuffer[cur.row][cur.col];
            cur = p;
        }
        return path;
    }


    export function AStar_findPath(start: tiles.Location, goal: tiles.Location) {
        const state = initialize_AStar(start, goal, DistanceMetric.Manhattan | DistanceMetric.Euclidean);
        let stepRes: AStartPathStep;
        do {
            stepRes = AStar_pathStep(state);
        } while (stepRes.result === PathStepResult.Continue);

        return stepRes.result === PathStepResult.GoalFound ? AStar_tracePath(state) : [];
    }
}